import React from 'react';
import { Button } from 'caihrc';

import styles from './about.module.less'

const About  = function () {
    return(
        <div className='dsContent'>
            <div className={styles.aboutTest}>
                About
                <Button>dx-btn</Button>
                <div className={styles.hhh}>
                    8888
                </div>
            </div>
        </div>
    )
};

export default About
