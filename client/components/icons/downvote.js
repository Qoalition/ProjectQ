import React, { useState } from 'react';
import PropTypes from 'prop-types';

const downvote = ({type, id, voteCount, fill, stroke}) => {
    const [count, setCount] = useState(voteCount)

    function downVoteQuestion() {
        fetch('http://localhost:5000/questions/downvote',
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({question_id: id})
        })
        .then( res => res.json() )
        .then( data => {
            setCount(count + 1);
        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }

    function downVoteAnswer() {
        fetch('http://localhost:5000/answers/downvote',
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({answer_id: id})
        })
        .then( res => res.json() )
        .then( data => {
            setCount(count + 1);
        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }

    function handleClick(e) {
        // console.log(e);
        type === 'question' ? downVoteQuestion() : downVoteAnswer() 
    }
    return (
        <>
            <svg onClick={handleClick} width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.21677 19.625C9.59777 20.1 10.3978 20.1 10.7788 19.625L18.7788 9.62501C18.8961 9.4778 18.9696 9.30048 18.9907 9.1134C19.0119 8.92633 18.9798 8.73708 18.8983 8.5674C18.8167 8.39771 18.689 8.25446 18.5297 8.1541C18.3704 8.05374 18.186 8.00033 17.9978 8.00001L13.9978 8.00001L13.9978 1.00001C13.9978 0.734794 13.8924 0.48044 13.7049 0.292903C13.5173 0.105367 13.263 1.09428e-05 12.9978 1.09196e-05L6.99777 1.03951e-05C6.73256 1.03719e-05 6.4782 0.105367 6.29067 0.292903C6.10313 0.480439 5.99777 0.734793 5.99777 1.00001L5.99777 8.00001L1.99777 8.00001C1.80951 8.00033 1.62515 8.05374 1.46586 8.1541C1.30657 8.25446 1.17882 8.39771 1.09727 8.56739C1.01571 8.73708 0.983666 8.92633 1.00481 9.1134C1.02594 9.30048 1.09941 9.4778 1.21677 9.62501L9.21677 19.625ZM6.99777 10L7.99777 10L7.99777 2.00001L11.9978 2.00001L11.9978 10L15.9168 10L9.99777 17.399L4.07877 10L6.99777 10Z" fill={fill} strokeWidth={stroke}/>
            </svg>
            {count > 0 ? count : ''}
        </>
    );
};

downvote.propTypes = {
    type: PropTypes.string,
    id: PropTypes.number,
    voteCount: PropTypes.number,
    fill: PropTypes.string,
    stroke: PropTypes.string
};

downvote.defaultProps = {
    fill: '#fff',
    stroke: 'null',
    voteCount: 0,
    id: 0,
    type: 'null',
}

export default downvote;
