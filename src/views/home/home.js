import {Link} from "react-router-dom";
import React from "react";
import { Button, Icon} from 'caihrc';
import HomeRouter from '../../router/home'
import styles from './home.module.less'
import Logo from '../../images/logo.png'

const Home  = function () {
    return(
        <div className={styles.homeWrap}>
            <header className={styles.homeHeader}>
                <img src={Logo} className={styles.logo} alt="logo"/>
                {/*后续有其他内容可以加在btn 后面*/}
                <div className={styles.collapseButton}>
                    <i className="ds-iconfont ds-icon-arrow-right" />
                </div>
                <div className={styles.user}>user</div>
            </header>
            <aside className={styles.homeAside}>
                <nav>
                    <ul>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">dashboard</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className={styles.homeMain}>
                <HomeRouter/>
            </main>
        </div>
    )
};

export default Home



