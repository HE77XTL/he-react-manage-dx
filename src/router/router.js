import React from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from '../views/home/home'
import Login from '../views/login/login'



export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" ><Login /></Route>
                <Route path="/"><Home /></Route>
            </Switch>
        </Router>
    );
}

