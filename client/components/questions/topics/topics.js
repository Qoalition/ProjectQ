import React, { useEffect } from 'react'

// SCSS Module
import styles from './topics.module.scss'

const topics = ({ topics, callback }) => {
    let topicsArray = [];
    if (Array.isArray(topics)) {
      topicsArray = topics;
    }
    useEffect(() => {
        // console.log(topics);
    })
    return (
        <div className={styles.topics}>
            <ul>
                <li onClick={(e) => callback(e)} key="x" className={styles.active}>All Topics</li>
                {
                    (topicsArray || []).map((e, i) => {
                        return <li onClick={(e) => callback(e)} key={i}>{e.topic}</li>
                    })
                }
            </ul>
        </div>
    );
};

export default topics;
