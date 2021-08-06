import React from 'react';
import PropTypes from 'prop-types';



const upvote = ({type, id, voteCount, fill, stroke}) => {

    const request = {
        "question_id": id,
        "answer_id": id
    }

    function upVoteQuestion() {
        fetch('http://localhost:5000/questions/upvote',
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then( res => res.json() )
        .then( data => {

        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }

    function upVoteAnswer() {
        fetch('http://localhost:5000/answers/upvote',
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then( res => res.json() )
        .then( data => {

        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }

    function handleClick() {
        console.log(JSON.stringify(request))
        type === 'question' ? upVoteQuestion() : upVoteAnswer() 
    }

    return (
        <>
            <svg onClick={handleClick} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.7803 0.35625C9.3993 -0.11875 8.5993 -0.11875 8.2183 0.35625L0.218298 10.3562C0.100937 10.5035 0.027469 10.6808 0.00633031 10.8679C-0.0148084 11.0549 0.0172391 11.2442 0.0987929 11.4139C0.180347 11.5836 0.3081 11.7268 0.467386 11.8272C0.626672 11.9275 0.811032 11.9809 0.999298 11.9812H4.9993V18.9813C4.9993 19.2465 5.10466 19.5008 5.29219 19.6884C5.47973 19.8759 5.73408 19.9813 5.9993 19.9813H11.9993C12.2645 19.9813 12.5189 19.8759 12.7064 19.6884C12.8939 19.5008 12.9993 19.2465 12.9993 18.9813V11.9812H16.9993C17.1876 11.9809 17.3719 11.9275 17.5312 11.8272C17.6905 11.7268 17.8182 11.5836 17.8998 11.4139C17.9814 11.2442 18.0134 11.0549 17.9923 10.8679C17.9711 10.6808 17.8977 10.5035 17.7803 10.3562L9.7803 0.35625ZM11.9993 9.98125H10.9993V17.9813H6.9993V9.98125H3.0803L8.9993 2.58225L14.9183 9.98125H11.9993Z" fill={fill} stroke={stroke} />
            </svg>
            {voteCount > 0 ? voteCount : ''}
        </>
    );
};

upvote.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    voteCount: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
};

upvote.defaultProps = {
    fill: '#fff',
    stroke: 'null',
    voteCount: 0,
    id: 0,
    type: 'null',
}

export default upvote;
