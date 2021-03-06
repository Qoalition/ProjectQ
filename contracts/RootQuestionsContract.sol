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

    function addQuestion(uint _id) public returns(QuestionContract _q){
        QuestionContract question = new QuestionContract(_id);
        questions.push(question);
        emit QuestionCreated(address(question), _id);
        _q = question;
        return _q;
    }

    function getQuestions() external view returns(QuestionContract[] memory _questions) {
        _questions = questions;
    }
}


