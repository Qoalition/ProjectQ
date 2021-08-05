import React from 'react';
import PropTypes from 'prop-types';
import styles from './questions.module.scss';

// components
import Question from './question/question'
import Topics from './topics/topics'

const questions = props => {
    return (
        <>
            <div className={styles.actions}>
                <select>
                    <option>Most Recent</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                </select>
                <button>Ask a Question</button>
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
        </>
    );
};

questions.propTypes = {
    
};

export default questions;
