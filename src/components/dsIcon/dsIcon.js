import React from 'react';
import classes from '../../assets/helpers/classes'

const DsIcon = function (props) {
    const fontSize = props.size ? props.size + 'px' : '16px';
    const color = props.color ? props.color : null;
    const propsStyles = {
        fontSize,
        color
    };
    return (
        <i className={classes('ds-iconfont', props.name, props.className)}
           style={propsStyles} />
    )
};

export default DsIcon
