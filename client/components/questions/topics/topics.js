import React from 'react'

// SCSS Module
import styles from './topics.module.scss'

const topics = ( { props } ) => {

    function handleClick(e) {
        const prev = document.getElementsByClassName(styles.active)[0];
        if (prev) prev.classList.remove(styles.active);
        const item = e.target;
        item.classList.toggle(styles.active);
    }

    return (
        <div className={styles.topics}>
            <ul>
                {
                    props.map((e, i) => {
                        return <li onClick={handleClick} key={i}>{e.topic}</li>
                    })
                }
            </ul>
        </div>
    );
};

export default topics;
