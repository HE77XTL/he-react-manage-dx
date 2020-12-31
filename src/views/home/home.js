import {Link} from "react-router-dom";
import React from "react";
import HomeRouter from '../../router/home'
import'./home.less'

const Home  = function () {
    return(
        <div>
            <header className="home">
                <h2> home header</h2>
                <div className="test">class test</div>
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



