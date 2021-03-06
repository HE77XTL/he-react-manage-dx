import React, {useState, useEffect} from 'react';
import {Menu} from 'caihrc';
import {useHistory} from "react-router-dom";
import DsIcon from '../../components/dsIcon/dsIcon'
import styles from "./home.module.less";
import store from 'store'
import {useTranslation} from "react-i18next";

const HomeAside = function (props) {
    const menuList = store.get('menuList');
    const history = useHistory();
    const {t, i18n} = useTranslation();

    const [menuStyle, setMenuStyle] = useState(menuStyleFmt(props.collapse))

    function menuStyleFmt(collapse) {
        return collapse
            ? {opacity: '0', width: '0'}
            : {opacity: '1', width: '220px'}
    }

    useEffect(() => {
        setMenuStyle(menuStyleFmt(props.collapse))
    }, [props.collapse]);


    // 菜单递归渲染
    function menuFmt(menu) {
        return (menu.children && menu.children.length > 0)
            ? <Menu.SubMenu
                title={t(menu.name)}
                key={menu.url}
                icon={menu.icon ? <DsIcon name={menu.icon} size="18"/> : null}>
                {menu.children.map(item => {
                    if (item.children && item.children.length > 0) {
                        return (menuFmt(item))
                    } else {
                        return (<Menu.Item key={item.index}>{t(item.name)}</Menu.Item>)
                    }
                })}
            </Menu.SubMenu>
            : <Menu.Item
                key={menu.url}
                icon={menu.icon ? <DsIcon name={menu.icon} size="18"/> : null}>
                {t(menu.name)}
            </Menu.Item>
    }

    // 点击跳转
    function onMenuClick(e) {
        history.push(e.key)
    }


    return (
        <div className={styles.homeAside} style={menuStyle}>
            <Menu onClick={(e) => {
                onMenuClick(e)
            }}
                  defaultSelectedKeys={['input']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={false}>
                {menuList && menuList.map(item => {
                    return menuFmt(item)
                })}
            </Menu>
        </div>)
};

export default HomeAside
