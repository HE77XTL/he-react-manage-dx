import React, {useState, useEffect} from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from '../views/home/home'
import Login from '../views/login/login'
import PageZhCN from "../locales/zh_cn";
import PageEn from "../locales/en";
import Events from "../common/utils/Events";
import {IntlProvider} from "react-intl";


import AntZhCN from 'caihrc/lib/locale/zh_CN';
import AntEnGB from 'caihrc/lib/locale/en_GB';


import ConfigProvider from 'caihrc/lib/config-provider';


export default function App() {

    const [languageOptions, setLanguageOptions] = useState({
        locale: 'zh',
        localeMessages: PageZhCN,
        ant: AntZhCN,

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
                return {
                    localeMessages: PageZhCN,
                    ant: AntZhCN,
                };
            case 'en':
                return {
                    localeMessages: PageEn,
                    ant: AntEnGB,
                };
            default:
                return {
                    localeMessages: PageEn,
                    ant: AntEnGB,
                };
        }
    }

    function languageChange(e) {
        setLanguageOptions({
            locale: e,
            ...getLanguageMes(e)
        })
    }


    return (
        <IntlProvider locale={languageOptions.locale} messages={languageOptions.localeMessages}>
            <ConfigProvider locale={AntZhCN}>
                <Router>
                    <Switch>
                        <Route path="/login"><Login/></Route>
                        <Route path="/"><Home/></Route>
                    </Switch>
                </Router>
            </ConfigProvider>
        </IntlProvider>
    );
}

