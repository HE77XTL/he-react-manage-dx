import React, {useState, useEffect} from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from '../views/home/home'
import Login from '../views/login/login'
import zh_CN from "../locales/zh_cn";
import en from "../locales/en";
import Events from "../common/utils/Events";
import {IntlProvider} from "react-intl";


export default function App() {

    const [languageOptions, setLanguageOptions] = useState({
        locale: 'zh',
        localeMessages: zh_CN
    });


    useEffect(() => {
        Events.on("languageChange", languageChange);
        return () => {
            Events.off("languageChange", languageChange);
        }
    }, []);


    function getLanguageMes(type) {
        switch (type) {
            case 'zh':
                return zh_CN;
            case 'en':
                return en;
            default:
                return en
        }
    }

    function languageChange(e) {
        console.log('languageChange')
        console.log(e)
        setLanguageOptions({
            locale: e,
            localeMessages: getLanguageMes(e)
        })
    }


    return (
        <IntlProvider locale={languageOptions.locale} messages={languageOptions.localeMessages}>
            <Router>
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/"><Home/></Route>
                </Switch>
            </Router>
        </IntlProvider>
    );
}

