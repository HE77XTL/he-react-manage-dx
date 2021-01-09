import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Button, Icon} from 'caihrc';
import HomeRouter from '../../router/home'
import styles from './home.module.less'
import Logo from '../../images/logo.png'

import DsIcon from '../../components/dsIcon/dsIcon'
import HomeAside from './homeAside'


const Home = function () {
    const [collapseStyle, setCollapseStyle] = useState({
        name: 'ds-icon-arrow-left',
        color: null,
        asideWidth: '220px'
    });
    const [collapse, setCollapse] = useState(false);

    function onCollapseChange() {
        if (!collapse) {
            setCollapseStyle({
                name: 'ds-icon-arrow-right',
                color: '#00AAFF',
                asideStyle: {
                    opacity: '0',
                    width: '0',
                }
            });
        } else {
            setCollapseStyle({
                name: 'ds-icon-arrow-left',
                color: 'green',

                asideStyle: {
                    opacity: '1',
                    width: '220px',
                }
            });
        }
        setCollapse(!collapse);
    }


    return (
        <div className={styles.homeWrap}>
            <header className={styles.homeHeader}>
                <img src={Logo} className={styles.logo} alt="logo"/>
                {/*后续有其他内容可以加在btn 后面*/}
                <div className={styles.collapseButton} onClick={onCollapseChange}>
                    <DsIcon size="24"
                            color={collapseStyle.color}
                            name={collapseStyle.name}
                            className="test"/>
                </div>
                <div className={styles.user}>user</div>
            </header>
            <aside className={styles.homeAside}
                   style={collapseStyle.asideStyle}>
                <div>
                    <HomeAside/>
                </div>
            </aside>
            <main className={styles.homeMain}>
                <div style={{margin: '10px'}}>
                    <HomeRouter/>
                </div>
            </main>
        </div>
    )
};

export default Home



