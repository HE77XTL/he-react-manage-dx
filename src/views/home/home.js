import {Link} from "react-router-dom";
import React from "react";
import HomeRouter from '../../router/home'

const Home  = function () {
    return(
        <div>
            <header>
                <h2> home header</h2>
            </header>
            <aside>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
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
                content
                <HomeRouter/>
            </main>
        </div>
    )
};

export default Home



