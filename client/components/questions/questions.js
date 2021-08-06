import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './questions.module.scss';

// components
import Question from './question/question'
import Topics from './topics/topics'
import Close from '../icons/close'
import Router from 'next/router'

const questions = ({ allQuestions, topics }) => {
    const [_payload, setPayload] = useState({
        display: false,
        question: '',
        question_bc_address: ((Math.random() * 100) * (Math.random() * 100)).toString(),
        user_id: 1,
        topic: ''
    })

    function openModal(e) {
        e.preventDefault()
        _payload.display ? setPayload({..._payload, display: false}) : setPayload({..._payload, display: true}) 
    }

    function postQuestion(e) {
        e.preventDefault()
        // const num = (Math.random(0, 1) * 100) * (Math.random(0, 1) * 100);
        // const bc = num.toString();
        // console.log(bc);
        // setPayload({..._payload, question_bc_address: bc});
        console.log(_payload);
        fetch('http://localhost:5000/questions/create',
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_payload)
        })
        .then( res => res.json() )
        .then( data => {
            console.log(data);
            setPayload({..._payload, display: false});
            Router.push('/');
        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }
    
    function handleChange(event) {
        const { name, value } = event.target; //event target is each indivisual form that is being inputed
        setPayload({ ..._payload, [name]: value }); // copies previous state and updates only changed key/values
    }
    
    function getQuestions() {
        fetch(
            'http://localhost:5000/questions/get',
            {method: 'GET', mode: 'cors'}
        )
            .then( res => res.json() )
            .then( data => {/*console.log(data)*/} )
    }

    useLayoutEffect(() => {
        const e = document.getElementById('modal')
        _payload.display ? e.classList.add(styles.show) : e.classList.remove(styles.show)
    }, [_payload.display])

    return (
        <>
            <div className={styles.actions}>
                <select>
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                </select>
                <button onClick={openModal}>Ask a Question</button>
            </div>
            <div className={styles.questions}>
                <Topics />
                <div className="questionsFeed">
                    {allQuestions.map(e =><Question props={e} key={Math.random(0, 100)} />)}
                </div>
            </div>
            <div id="modal" className={styles.modal}>
                <form onSubmit={(e) => postQuestion(e)}>
                    <header>
                        <Close onClick={openModal}/>
                        <h3>Ask a Question</h3>
                    </header>
                    <fieldset>
                        <textArea 
                            name="question"
                            value={_payload.question}
                            onChange={handleChange}
                            placeholder="Start your question with “What”, “Why”, “How”, etc."></textArea>
                        <div>
                            <select
                                name="topic"
                                value={_payload.topic}
                                onChange={handleChange}
                            >
                                <option value="" defaultValue disabled hidden>Select a Topic</option>
                                <option>Technology</option>
                                <option>Business</option>
                                <option>Current Events</option>
                                <option>Computer Science</option>
                                <option>Politics</option>
                                <option>Social Sciences</option>
                                <option>Health</option>
                                <option>Medicine</option>
                                <option>Entertainment</option>
                            </select>
                            <div className="actions">
                                <button onClick={openModal}>Cancel</button>
                                <input type="submit" value="Add Question" />
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

questions.propTypes = {
    allQuestions: PropTypes.array,
    topics: PropTypes.array
};
questions.defaultProps = {
    allQuestions: [],
    topics: []
}

export default questions;
