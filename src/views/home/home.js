import {Link} from "react-router-dom";
import React from "react";
import HomeRouter from '../../router/home'
import styles from './home.module.less'

const Home  = function () {
    return(
        <div>
            <header className={styles.home}>
                <h2> home header</h2>
                <div className={styles.test}>class test</div>
            </header>
            <aside>
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
            <main>
                <HomeRouter/>
            </main>
        </div>
    )
};

export default Home



