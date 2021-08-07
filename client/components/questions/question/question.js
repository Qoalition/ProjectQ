import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image'

// SCSS Module
import styles from './question.module.scss'

// icons
import Upvote from '../../icons/upvote'
import Downvote from '../../icons/downvote'
import Comment from '../../icons/comment'
import Share from '../../icons/share'

const question = ({ props }) => {
    useEffect(() => {
        // console.log(props)
    })
    return (
        <div className={styles.question}>
            <header>
                <div>{props.username} asks in {props.topic}</div>
                <h2>{props.question}</h2>
            </header>
            <article>{props.question_description}</article>
            <footer>
                <ul>
                    <li>
                        {/* className={styles.active} */}
                        <Upvote voteCount={props.num_upvotes} type="question" id={props.question_id} />
                    </li>
                    <li>
                        <Downvote voteCount={props.num_downvotes} type="question" id={props.question_id} />
                    </li>
                    <li>
                        <Comment answerCount={props.answer_count} id={props.question_id} />
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
