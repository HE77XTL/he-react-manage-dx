import React from 'react';
import {createFromIconfontCN} from '@ant-design/icons';

const CustomizeIcon = createFromIconfontCN({
    // 在 iconfont.cn 上生成。生产可下载部署到自己的cdn
    scriptUrl: '//at.alicdn.com/t/font_2306877_kkgbtwfi7gc.js',
});


const DsIcon = function (props) {
    const fontSize = props.size ? props.size + 'px' : '16px';
    const color = props.color ? props.color : null;
    const propsStyles = {
        fontSize,
        color,
    };
    return (<CustomizeIcon type={props.name} style={propsStyles} />)
};

export default DsIcon
