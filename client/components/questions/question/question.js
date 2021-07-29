import React from 'react';
import PropTypes from 'prop-types';

// SCSS Module
import styles from './question.module.scss'

const question = props => {
    return (
        <div className={styles.question}>
            <header>
                <div>username asks</div>
                <h2>What does a question look like and how do you write one?</h2>
            </header>
            <article>Will this be the top answer or a description to the question? Ultimately, just secondary text though to expand on the...</article>
            <footer>
                <ul>
                    <li>
                        <box-icon name='upvote'></box-icon>
                        915
                    </li>
                    <li>
                        <box-icon name='downvote'></box-icon>
                        50
                    </li>
                    <li>
                        <box-icon name='comment-add' ></box-icon>
                        32
                    </li>
                    <li>
                        <box-icon name='share' flip='horizontal' ></box-icon>
                    </li>
                </ul>
            </footer>
        </div>
    );
};

question.propTypes = {
    
};

export default question;