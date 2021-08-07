// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

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
        // require(upVoters[tx.origin] == false, 'You can only vote once');
        _answer.upVotes += 1;
        upVoters[tx.origin] = true;
        if (downVoters[tx.origin]) {
            _answer.downVotes -= 1;
            downVoters[tx.origin] = false;
        }
    }

    function downVoteAnswer() public {
        // require(downVoters[tx.origin] == false, 'You can only vote once');
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