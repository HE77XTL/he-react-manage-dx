import React, {useState, useEffect} from "react";
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Home from '../views/home/home'
import Login from '../views/login/login'
import Events from "../common/utils/Events";
import store from 'store'

import AntZhCN from 'caihrc/lib/locale/zh_CN';
import AntEnGB from 'caihrc/lib/locale/en_GB';
import ConfigProvider from 'caihrc/lib/config-provider';


export default function App() {
    // 多语言，会默认先读取 缓存，如没有，默认英文
    const languageType = store.get('languageType') || 'en';
    const [antLanguage, setAntLanguage] = useState(getAntLanguage(languageType));

    useEffect(() => {
        Events.on("languageChange", languageChange);
        return () => {
            Events.off("languageChange", languageChange);
        }
    }, []);


    function getAntLanguage(type) {
        switch (type) {
            case 'zh':
                return AntZhCN;
            case 'en':
                return AntEnGB;
            default:
                return AntEnGB;
        }
    }

    function languageChange(e) {
        store.set('languageType', e);
        setAntLanguage(getAntLanguage(e))
    }

    return (
        <ConfigProvider locale={antLanguage}>
            <Router>
                <Switch>
                    <Route path="/login"><Login/></Route>
                    <Route path="/"><Home/></Route>
                </Switch>
            </Router>
        </ConfigProvider>
    );
}

