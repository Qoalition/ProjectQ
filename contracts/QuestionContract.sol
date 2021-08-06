// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './AnswerContract.sol';

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