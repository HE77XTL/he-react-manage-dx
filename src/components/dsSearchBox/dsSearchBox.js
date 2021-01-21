// 对搜索框常见的 input  select time 做简单的封装

import React, {useState, useEffect} from 'react'
import moment from 'moment'
import {Input, Button} from 'caihrc'

import styles from './dsSearchBox.module.less'


const DsSearchBox = function ({searcitems}) {
    const [searchForm, setSearchForm] = useState({});

    useEffect(() => {
        const searchData = searcitems.reduce((accumulator, currentValue) => {
            return Object.assign({}, accumulator, {
                [currentValue.key]: currentValue.searchValue
            })
        }, {});
        console.log('searchData')
        console.log(searchData)
        setSearchForm(searchData)
    }, []);


    function labelStyle(width) {
        return {
            width: width || null
        }
    }

    function onInputChange(e, item) {
        console.log('e, item')
        console.log(e, item)


        if (!item.type || item.type === 'text') {
            setSearchForm(Object.assign({}, searchForm, {
                [item.key]: e.target.value
            }));
            return
        }

        if (item.type === 'select') {
            setSearchForm(Object.assign({}, searchForm, {
                [item.key]: e
            }));
            return
        }

        if (item.type === 'date') {
            console.log('select999999')
            console.log(e)
            setSearchForm(Object.assign({}, searchForm, {
                [item.key]: e
            }));
        }
    }

    function onOperateClick(type) {
        setSearchForm({
            '1': "22888",
            '2': "",
            '3': 2
        })

        if (type === 'search') {

        }

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
                    }} options={item.options} style={{minWidth: '150px'}} /> : null
                }
                {
                    item.type === 'date' ? <Input type="date" value={searchForm[item.key]} onChange={(e) => {
                        onInputChange(e, item)
                    }} /> : null
                }
            </div>)
        })}
        <div className={styles.searchBtnWrap}>
            <Button onClick={() => {
                onReset()
            }}>重置</Button>
            <Button type="danger" onClick={() => {
                onOperateClick('search')
            }}>搜索</Button>
        </div>
    </div>)
};

export default DsSearchBox
