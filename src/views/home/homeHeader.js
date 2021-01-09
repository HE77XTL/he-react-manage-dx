import React, {useState, useEffect} from 'react';
import styles from "./home.module.less";
import Logo from "../../images/logo.png";
import DsIcon from "../../components/dsIcon/dsIcon";
import Events from '../../components/utils/Events'

const HomeHeader = function (props) {
    const [iconStyle, setIconStyle] = useState(iconFmt(props.collapse));

    function onCollapseChange() {
        // 简单的父子组件，可以通过父组件传递回调函数进行事件传递
        // 使用 Events 要记得 清除订阅
        // 个人更喜欢传递函数的形式
        setIconStyle(iconFmt(!props.collapse));

        Events.emit("collapse", !props.collapse);
    }

    function iconFmt(collapse) {
        return collapse
            ? {name: 'ds-icon-arrow-right', color: '#00AAFF'}
            : {name: 'ds-icon-arrow-left', color: '#333'}
    }

    return (<div className={styles.homeHeader}>
        <img src={Logo} className={styles.logo} alt="logo"/>
        <div className={styles.collapseButton} onClick={onCollapseChange}>
            <DsIcon
                size="24"
                color={iconStyle.color}
                name={iconStyle.name}
            />
        </div>
        <div className={styles.user}>user</div>
    </div>)
};

export default HomeHeader
