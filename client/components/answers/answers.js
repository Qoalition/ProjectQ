import React from 'react';
import PropTypes from 'prop-types';

import styles from './answers.module.scss'

// icons
import Upvote from '../icons/upvote'
import Downvote from '../icons/downvote'
import Comment from '../icons/comment'
import Share from '../icons/share'

const answers = props => {
    return (
        <div className={styles.answers}>
            <header>
                <div>username answers</div>
            </header>
            <article>
                <p>
                    The “human behavior” I would like to talk about is something called “splitting”. An interesting fact about splitting is that the sufferer sees the world in 1’s and 0’s. Either hot or cold, good or bad, sick or healthy, nice or mean, and so on…
                </p>
                <p>
                    The evaluation threshold most people suffering from this mental disorder use is very thin. If they just meet you and you stub their toe on a date, suddenly they hate you and will trash talk you for all of time. Others have a thicker skin. They will put up with your flaws for as long as their virtue can tolerate you. However, once your “1” becomes a “0”, then you’re done... (more)
                </p>
            </article>
            <footer>
                <ul>
                    <li className={styles.active}>
                        <Upvote type="answer" id="" />
                    </li>
                    <li>
                        <Downvote type="answer" id="" />
                    </li>
                    <li>
                        <Share />
                    </li>
                </ul>
            </footer>
        </div>
    );
};

answers.propTypes = {
    
};

export default answers;