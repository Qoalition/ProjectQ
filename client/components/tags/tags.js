import React from 'react';

import styles from './tags.module.scss'

const tags = ({ topic }) => {
    return (
        <ul className={styles.tags}>
            <li>{topic}</li>
        </ul>
    );
};

export default tags;
