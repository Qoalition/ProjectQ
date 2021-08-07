import React from 'react';
import Link from 'next/link'

import Image from 'next/image'
import logo from '../../public/Q.svg';
import styles from './header.module.scss';

import Wallet from '../wallet/wallet';

const header = props => {
    return (
        <header className={styles.header}>
            <div className="logo">
                <Link href="/"><Image src={logo} alt="Q logo" /></Link>
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

export default header;
