import React, { useEffect, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router'

// scss modules
import styles from './questions.module.scss';
import topicStyles from './topics/topics.module.scss'

// components
import Question from './question/question'
import Topics from './topics/topics'
import Modal from './modal/modal';



const questions = ({ allQuestions, usedTopics }) => {
    const initialState = {
        display: false,
        question: '',
        question_description: '',
        user_id: Math.floor(Math.random() * 5) + 1,
        topic: '',
        questions: []
    }
    const [_payload, setPayload] = useState(initialState);

    function openModal(e) {
        e.preventDefault()
        _payload.display ? setPayload({..._payload, display: false}) : setPayload({..._payload, display: true}) 
    }

    function getQuestions() {
        setPayload({..._payload, questions: allQuestions})
    }

    function postQuestion(e) {
        e.preventDefault()

        fetch('http://localhost:5000/questions/create',
        {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({..._payload, question: sqlEscapeString(_payload.question), question_description: sqlEscapeString(_payload.question_description)})
        })
        .then( res => res.json() )
        .then( data => {
            setPayload({initialState, user_id: Math.floor(Math.random() * 5) + 1});
            document.getElementById('questionField').value = '';
            document.getElementById('descriptionField').value = '';
            Router.push('/');
        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }
    
    function fetchQuestionsByTopic(topic) {
        const request = { topic: topic };
        fetch('http://localhost:5000/questions/getByTopic',
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        })
        .then( res => res.json() )
        .then( data => {
            // console.log(data);
            setPayload({..._payload, questions: data})
        })
        .catch((err) => {
            console.log("Post Fail", err);
        });
    }

    function changeTopic(e) {
        const prev = document.getElementsByClassName(topicStyles.active)[0];
        if (prev) prev.classList.remove(topicStyles.active);
        const item = e.target;
        const value = item.innerHTML;
        item.classList.toggle(topicStyles.active);
        value === 'All Topics' ? getQuestions() : fetchQuestionsByTopic(value);
    }

    function handleChange(event) {
        const { name, value } = event.target; //event target is each indivisual form that is being inputed
        setPayload({ ..._payload, [name]: value }); // copies previous state and updates only changed key/values
    }

    function sqlEscapeString(str) {
        if (typeof str != 'string')
            return str;
    
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\"+char; 
            }
        });
    }

    useEffect(() => {
        getQuestions();
    }, [allQuestions])

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
                { usedTopics ? <Topics topics={usedTopics} callback={changeTopic} /> : ''}
                <div className="questionsFeed">
                    {_payload.questions.map(e =><Question props={e} showHeader={true} key={Math.random(0, 100)} />)}
                </div>
            </div>
            <Modal 
                display={_payload.display} 
                open={openModal} 
                question={_payload.question} 
                description={_payload.question_description}
                handler={handleChange} 
                post={postQuestion}
                topic={_payload.topic}
            />
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
