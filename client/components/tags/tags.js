import React from 'react';
import PropTypes from 'prop-types';

import styles from './tags.module.scss'

const tags = props => {
    return (
        <ul className={styles.tags}>
            { /* Tags */ }
            <li>Psychology</li>
            <li>Behavior</li>
        </ul>
    );
};

tags.propTypes = {
    
};

export default tags;