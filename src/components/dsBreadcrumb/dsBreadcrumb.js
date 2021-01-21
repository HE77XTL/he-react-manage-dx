// 没有根据路由全局统一配置
// 主要考虑后期某些自定义
// 而且页面使用成本也不高

import React from 'react';
import {Breadcrumb} from 'caihrc';
import styles from './dsBreadcrumb.module.less'

import {useHistory} from "react-router-dom";

const DsBreadcrumb = function ({crumbs}) {
    const history = useHistory();

    function onBreadcrumbClick(item) {
        if (item.url) {
            history.push(item.url)
        }
    }

    return (<div className={styles.dsBreadcrumb}>
        <Breadcrumb style={{boxShadow: 'none', paddingLeft: 0}}>
            {
                crumbs && crumbs.map((item, index) => {
                    return <Breadcrumb.Item key={index} onClick={() => {
                        onBreadcrumbClick(item)
                    }} className={styles.breadItem}>{item.name}</Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    </div>)
};

export default DsBreadcrumb
