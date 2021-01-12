import {Link} from "react-router-dom";
import React, {useState, useEffect} from "react";
import {Button, Icon} from 'caihrc';
import HomeRouter from '../../router/home'
import styles from './home.module.less'
import Logo from '../../images/logo.png'
import DsIcon from '../../components/dsIcon/dsIcon'
import HomeAside from './homeAside'
import Events from '../../common/utils/Events'
import HomeHeader from './homeHeader'

const Home = function () {
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
            <HomeAside collapse={collapse} />
            <main className={styles.homeMain}>
                <div style={{margin: '10px'}}>
                    <HomeRouter/>
                </div>
            </main>
        </div>
    )
};

export default Home



