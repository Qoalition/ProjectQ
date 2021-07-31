import React from 'react';
import PropTypes from 'prop-types';
import styles from './questions.module.scss';

// components
import Question from './question/question'
import Topics from './topics/topics'

const questions = props => {
    return (
        <div className={styles.questions}>
            <Topics />
            <div className="questionsFeed">
                <Question />
                <Question />
                <Question />
                <Question />
            </div>
        </div>
    );
};

questions.propTypes = {
    
};

export default questions;
