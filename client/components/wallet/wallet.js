import React from 'react';

import Image from 'next/image'
import styles from './wallet.module.scss';
import coin from '../../public/Qcoin.svg';

const wallet = props => {
    return (
        <div className={styles.wallet}>
            <div>
                <Image src={coin} alt="Q coin image" />
                <span>100.00+</span>
            </div>
            <div>
                jvfua.wam
            </div>
        </div>
    );
};

wallet.propTypes = {
    
};

export default wallet;
