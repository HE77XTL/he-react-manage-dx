import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {Button, Breadcrumb, Spin} from 'caihrc';
import HomeRouter from '../../router/home'
import styles from './home.module.less'
import Logo from '../../images/logo.png'
import DsIcon from '../../components/dsIcon/dsIcon'
import HomeAside from './homeAside'
import Events from '../../common/utils/Events'
import HomeHeader from './homeHeader'
import store from 'store'
import {useHistory} from "react-router-dom";

import Api from '../../common/request/api/api'

const Home = function () {
    const history = useHistory();
    const user = store.get('user');
    const menuList = store.get('menuList');

    // 未登录，跳转到登陆页
    // 对于token 失效。在接口请求的时候做统一处理了
    if (!user || !user.userName || !user.token || !menuList) {
        //history.push('/login');
    }

    const [collapse, setCollapse] = useState(false);

    useEffect(() => {
        Events.on("collapse", collapseChange);
        return () => {
            Events.off("collapse", collapseChange);
        }
    }, []);


    function collapseChange(val) {
        setCollapse(val)
    }


    return (
        <div className={styles.homeWrap}>
            <HomeHeader collapse={collapse}/>
            <HomeAside collapse={collapse}/>
            <main className={styles.homeMain}>
                <div style={{margin: '10px'}}>
                    <HomeRouter/>
                </div>
            </main>
        </div>
    )
};

export default Home



