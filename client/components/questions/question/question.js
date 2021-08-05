import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image'

// SCSS Module
import styles from './question.module.scss'

// icons
import Upvote from '../../icons/upvote'
import Downvote from '../../icons/downvote'
import Comment from '../../icons/comment'
import Share from '../../icons/share'

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
                    <li className={styles.active}>
                        <Upvote type="question" id="" />
                    </li>
                    <li>
                        <Downvote type="question" id="" />
                    </li>
                    <li>
                        <Comment />
                    </li>
                    <li>
                        <Share />
                    </li>
                </ul>
            </footer>
        </div>
    );
};

question.propTypes = {
    
};

export default question;
