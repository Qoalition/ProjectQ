import React from 'react'

// SCSS Module
import styles from './topics.module.scss'

const topics = ({ topics, callback }) => {
    
    return (
        <div className={styles.topics}>
            <ul>
                <li onClick={(e) => callback(e)} key="x" className={styles.active}>All Topics</li>
                {
                    topics.map((e, i) => {
                        return <li onClick={(e) => callback(e)} key={i}>{e.topic}</li>
                    })
                }
            </ul>
        </div>
    );
};

export default topics;
