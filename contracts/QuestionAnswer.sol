// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract RootQuestionsContract {
    QuestionContract[] public questions;
    event QuestionCreated(address questionAddress, uint id);
    address public manager;

    constructor() {
        manager = msg.sender;
    }
    
    function addQuestion(uint _id) public {
        QuestionContract question = new QuestionContract(_id);
        questions.push(question);
        emit QuestionCreated(address(question), _id);
    }
    
    function getQuestions() external view returns(QuestionContract[] memory _questions) {
        _questions = questions;
    }
    
    function upVoteQuestion(uint questionIndex) public {
        require(questionIndex >= 0, 'Question not found');
        require(questionIndex < questions.length, 'Question not found');
        questions[questionIndex].upVoteQuestion();
    }

    function downVoteQuestion(uint questionIndex) public {
        require(questionIndex >= 0, 'Question not found');
        require(questionIndex < questions.length, 'Question not found');
        questions[questionIndex].downVoteQuestion();
    }
}

contract QuestionContract {
    // Answer data
    AnswerContract[] public answers;
    event AnswerCreated(address answerAddress, uint id);
    
    // Question data
    address public manager;
    mapping(address => bool) public upVoters;
    mapping(address => bool) public downVoters;
    Question public _question;
    struct Question {
        uint id;
        uint upVotes;
        uint downVotes;
        address asker;
    }

    constructor(uint _id) {
        _question.id = _id;
        _question.upVotes = 1;
        _question.downVotes = 0;
        _question.asker = tx.origin;
        upVoters[tx.origin] = true;
        manager = tx.origin;
    }

    function upVoteQuestion() public {
        require(upVoters[tx.origin] == false, 'You can only vote once');
        _question.upVotes += 1;
        upVoters[tx.origin] = true;
        if (downVoters[tx.origin]) {
            _question.downVotes -= 1;
            downVoters[tx.origin] = false;
        }
    }

    function downVoteQuestion() public {
        require(downVoters[tx.origin] == false, 'You can only vote once');
        _question.downVotes += 1;
        downVoters[tx.origin] = true;
        if (upVoters[tx.origin]) {
            _question.upVotes -= 1;
            upVoters[tx.origin] = false;
        }
    }

    function getQuestionVotes() public view returns(uint upVotes, uint downVotes) {
        upVotes = _question.upVotes;
        downVotes = _question.downVotes;
    }
    
    function addAnswer(uint _id) external {
        AnswerContract answer = new AnswerContract(_id);
        answers.push(answer);
        emit AnswerCreated(address(answer), _id);
    }
    
    function getAnswers() external view returns(AnswerContract[] memory _answers) {
        _answers = answers;
    }
    
    function upVoteAnswer(uint answerIndex) public {
        require(answerIndex >= 0, 'Answer not found');
        require(answerIndex < answers.length, 'Answer not found');
        answers[answerIndex].upVoteAnswer();
    }

    function downVoteAnswer(uint answerIndex) public {
        require(answerIndex >= 0, 'Answer not found');
        require(answerIndex < answers.length, 'Answer not found');
        answers[answerIndex].downVoteAnswer();
    }
}

contract AnswerContract {
    address public manager;
    mapping(address => bool) public upVoters;
    mapping(address => bool) public downVoters;
    Answer public _answer;
    struct Answer {
        uint id;
        uint upVotes;
        uint downVotes;
        address answerer;
    }
    constructor(uint _id) {
        _answer.id = _id;
        _answer.upVotes = 1;
        _answer.downVotes = 0;
        _answer.answerer = tx.origin;
        upVoters[tx.origin] = true;
        manager = tx.origin;
    }

    function upVoteAnswer() public {
        require(upVoters[tx.origin] == false, 'You can only vote once');
        _answer.upVotes += 1;
        upVoters[tx.origin] = true;
        if (downVoters[tx.origin]) {
            _answer.downVotes -= 1;
            downVoters[tx.origin] = false;
        }
    }

    function downVoteAnswer() public {
        require(downVoters[tx.origin] == false, 'You can only vote once');
        _answer.downVotes += 1;
        downVoters[tx.origin] = true;
        if (upVoters[tx.origin]) {
            _answer.upVotes -= 1;
            upVoters[tx.origin] = false;
        }
    }

    function getAnswerVotes() public view returns(uint upVotes, uint downVotes) {
        upVotes = _answer.upVotes;
        downVotes = _answer.downVotes;
    }
}
