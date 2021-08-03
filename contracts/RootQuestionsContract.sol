// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import './QuestionContract.sol';

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


