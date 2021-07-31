import React from 'react';
import PropTypes from 'prop-types';

import Image from 'next/image'
import logo from '../../public/Q.svg';
import styles from './header.module.scss';

import Wallet from '../wallet/wallet';

const header = props => {
    return (
        <header className={styles.header}>
            <div className="logo">
                    <Image src={logo} alt="Q logo" />
                </div>
                <div className="menu">
                    <ul>
                        <li>
                            <Wallet />
                        </li>
                    </ul>
                </div>
        </header>
    );
};

header.propTypes = {
    
};

export default header;
