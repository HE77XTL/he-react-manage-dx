import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import About from '../views/about/about'
import Dashboard from '../views/dashboard/dashboard'
import SendStatistic from '../views/sendStatistic/sendStatistic'
import SendDetail from '../views/sendDetail/sendDetail'

const HomeRouter = function () {
    return (
        <Router>
            <Switch>
                <Route path="/about"><About/></Route>
                <Route path="/bill"><Dashboard/></Route>
                <Route path="/sendStatistic"><SendStatistic/></Route>
                <Route path="/sendDetail"><SendDetail/></Route>
            </Switch>
        </Router>
    );
};

export default HomeRouter
