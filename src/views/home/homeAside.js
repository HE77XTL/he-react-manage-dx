import React from 'react';
import {Menu} from 'caihrc';
import menuList from './menuList'
import {useHistory} from "react-router-dom";
import DsIcon from '../../components/dsIcon/dsIcon'


const HomeAside = function (props) {
    const history = useHistory();

    // 菜单递归渲染
    function menuFmt(menu) {
        return (menu.subs && menu.subs.length > 0)
            ? <Menu.SubMenu title={menu.title}
                            key={menu.index}
                            icon={menu.icon ? <DsIcon name={menu.icon} size="18"/> : null}>
                {menu.subs.map(item => {
                    if (item.subs && item.subs.length > 0) {
                        return (menuFmt(item))
                    } else {
                        return (<Menu.Item key={item.index}>{item.title}</Menu.Item>)
                    }
                })}
            </Menu.SubMenu>
            : <Menu.Item key={menu.index}
                         icon={menu.icon ? <DsIcon name={menu.icon} size="18"/> : null}>
                {menu.title}
            </Menu.Item>
    }

    // 点击跳转
    function onMenuClick(e) {
        history.push(e.key)
    }


    return (
        <Menu onClick={(e) => {
            onMenuClick(e)
        }}
              defaultSelectedKeys={['input']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="light"
              inlineCollapsed={false}>
            {menuList.map(item => {
                return menuFmt(item)
            })}
        </Menu>
    )
};

export default HomeAside
