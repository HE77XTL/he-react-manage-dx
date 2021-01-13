import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import About from '../views/about/about'
import Dashboard from '../views/dashboard/dashboard'

const HomeRouter = function () {
    return (
        <Router>
            <Switch>
                <Route path="/about" ><About /></Route>
                <Route path="/bill"><Dashboard /></Route>
            </Switch>
        </Router>
    );
};

export default HomeRouter
