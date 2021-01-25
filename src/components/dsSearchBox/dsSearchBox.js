// 对搜索框常见的 input  select time 做简单的封装
// 对于组件提供的将search 和 table 高度封装的，过于依赖接口的统一
// 有些需求不能满足

import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {Input, Button} from 'caihrc'

import styles from './dsSearchBox.module.less'


const DsSearchBox = function (props) {
    const searcitems = props.searcitems;

    const [searchForm, setSearchForm] = useState({});

    useEffect(() => {
        const searchData = searcitems.reduce((accumulator, currentValue) => {
            return Object.assign({}, accumulator, {
                [currentValue.key]: currentValue.searchValue
            })
        }, {});
        setSearchForm(searchData)
    }, []);


    function labelStyle(width) {
        return {
            width: width || null
        }
    }

    function onInputChange(e, item) {
        let formData = {};
        switch (item.type) {
            case 'text':
                formData = Object.assign({}, searchForm, {
                    [item.key]: e.target.value
                });
                break;
            case 'select':
            case 'date':
            case 'number':
                formData = Object.assign({}, searchForm, {
                    [item.key]: e
                });
                break;
            default:
                formData = Object.assign({}, searchForm, {
                    [item.key]: e
                });
        }
        props.onChange(formData);
        setSearchForm(formData)

    }

    function onOperateClick() {
        props.dsCallBack(searchForm)
    }

    function onReset() {
        setSearchForm({});
    }


    return (<div className={styles.searchBox}>
        {searcitems.map((item, index) => {
            return (<div key={index} className={styles.searchItem}>
                <div style={labelStyle(item.width)}>{item.name}：</div>
                {
                    item.type === 'text'
                        ? <Input value={searchForm[item.key]} onChange={(e) => {
                            onInputChange(e, item)
                        }}/> : null
                }
                {
                    item.type === 'select' ? <Input type="select" value={searchForm[item.key]} onChange={(e) => {
                        onInputChange(e, item)
                    }} options={item.options} style={{minWidth: '150px'}}/> : null
                }
                {
                    item.type === 'date' ? <Input type="date" value={searchForm[item.key]} onChange={(e) => {
                        onInputChange(e, item)
                    }}/> : null
                }
                {
                    item.type === 'number' ? <Input type="number" value={searchForm[item.key]} onChange={(e) => {
                        onInputChange(e, item)
                    }}/> : null
                }
            </div>)
        })}
        <div className={styles.searchBtnWrap}>
            <div>
                <Button onClick={() => {
                    onReset()
                }}>重置</Button>
                <Button type="danger" onClick={() => {
                    onOperateClick('search')
                }}>搜索</Button>
            </div>
        </div>
    </div>)
};

export default DsSearchBox
