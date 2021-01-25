import React, {useState, useEffect} from 'react'
import {Table, Input, Space} from 'caihrc'
import classNames from 'classnames'

import styles from './sendStatistic.module.less'
import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'
import Api from '../../common/request/api/api'

import utils from '../../common/utils/utils'


const SendStatistic = function () {
    const crumbs = [
        {
            value: 'sendStatistic',
            name: '发送统计',
            url: ''
        },
    ];
//--- useState ----------------------
    const [statisticForm, setStatisticForm] = useState({
        sendNumber: 0,
        monetary: 0,
    });

//--- useEffect ------------------------
    useEffect(() => {
        initData()
    }, []);


//--- function --------------------
    // request
    function initData() {
        Api.getSendCountData().then(res => {
            if (res) {
                const newFormData = Object.assign({}, statisticForm, res);
                setStatisticForm(newFormData);
            }
        })
    }

    // operation


    const summary = [
        {
            title: '当月成功发送数',
            number: statisticForm.sendNumber,
            unit: '条'
        },
        {
            title: '当月消耗金额',
            number: statisticForm.monetary,
            unit: '元'
        }
    ];

    const SummaryPanel = function ({data}) {
        return (
            <div className={classNames('ds-border', styles.panel)}>
                <div>{data.title}</div>
                <div className={styles.numberLine}>
                    <div className={styles.number}>{utils.emptyFilter(data.number)}</div>
                    <div className={styles.unit}>{data.unit}</div>
                </div>
            </div>
        )
    }


    return (<div className='dsContent'>
        <DsBreadcrumb crumbs={crumbs}/>
        <div className={styles.summary}>
            {summary.map(summaryItem => {
                return <SummaryPanel data={summaryItem}/>
            })}
        </div>
        <div>
            注：展示当月数据概况（更新至昨日）
        </div>
    </div>)
}

export default SendStatistic
