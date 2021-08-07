import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// SCSS Module
import styles from './topics.module.scss'

const topics = ( { props } ) => {
    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div className={styles.topics}>
            <ul>
            {props.map(e =><li>{e.topic}</li>)}
                {/* <li>topic one</li>
                <li>topic two</li>
                <li>topic three</li>
                <li className={styles.active}>topic four</li>
                <li>topic five</li>
                <li>topic six</li>
                <li>topic seven</li>
                <li>topic eight</li>
                <li>topic nine</li>
                <li>topic ten</li> */}
            </ul>
        </div>
    );
};

topics.propTypes = {
    
};

export default topics;
