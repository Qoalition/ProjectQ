import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './questions.module.scss';

// components
import Question from './question/question'
import Topics from './topics/topics'
import Close from '../icons/close'

const questions = props => {
    const [display, setDisplay] = useState(false);

    function postQuestion(e) {
        e.preventDefault()
        display ? setDisplay(false) : setDisplay(true);
    }

    useLayoutEffect(() => {
        const e = document.getElementById('modal');
        display ? e.classList.add(styles.show) : e.classList.remove(styles.show);
    }, [display]);

    return (
        <>
            <div className={styles.actions}>
                <select>
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                </select>
                <button onClick={postQuestion}>Ask a Question</button>
            </div>
            <div className={styles.questions}>
                <Topics />
                <div className="questionsFeed">
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                </div>
            </div>
            <div id="modal" className={styles.modal}>
                <form onSubmit={(e) => postQuestion(e)}>
                    <header>
                        <Close onClick={() => {
                            display ? setDisplay(false) : setDisplay(true);
                            console.log(display)
                        }}/>
                        <h3>Ask a Question</h3>
                    </header>
                    <fieldset>
                        <textArea placeholder="Start your question with “What”, “Why”, “How”, etc."></textArea>
                        <div>
                            <select>
                                <option>Select a Topic</option>
                                <option>Topic</option>
                                <option>Topic</option>
                                <option>Topic</option>
                                <option>Topic</option>
                                <option>Topic</option>
                                <option>Topic</option>
                            </select>
                            <div className="actions">
                                <button onClick={postQuestion}>Cancel</button>
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
    
};

export default questions;
