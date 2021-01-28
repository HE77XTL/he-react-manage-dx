import React, {useState, useEffect} from 'react'
import {Table, Input, Space} from 'caihrc'
import classNames from 'classnames'

import styles from './sendStatistic.module.less'
import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'
import Api from '../../common/request/api/api'

import utils from '../../common/utils/utils'
import {useTranslation} from "react-i18next";


const SendStatistic = function () {
    const crumbs = [
        {
            value: 'sendStatistic',
            name: '发送统计',
            url: ''
        },
    ];
    const {t} = useTranslation();
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
        // 后端有些有单位，有些没有。。。
        {
            title: t('sendStatistic_SuccessOfMonth'),
            number: statisticForm.sendNumber,
            isUnit: false,
            unit: t('common_pieces')
        },
        {
            title: t('sendStatistic_ConsumptionOfMonth'),
            number: statisticForm.monetary,
            isUnit: true,
            unit: '元'
        }
    ];

    const SummaryPanel = function ({data}) {
        return (
            <div className={classNames('ds-border', styles.panel)}>
                <div>{data.title}</div>
                <div className={styles.numberLine}>
                    <div className={styles.number}> {SummaryNumber(data)}</div>
                </div>
            </div>
        )
    };

    const SummaryNumber = function (data) {
        return data.isUnit ? utils.emptyFilter(data.number) : `${utils.emptyFilter(data.number)}${data.unit}`
    }


    return (<div className='dsContent'>
        <DsBreadcrumb crumbs={crumbs}/>
        <div className={styles.summary}>
            {summary.map(summaryItem => {
                return <SummaryPanel data={summaryItem}/>
            })}
        </div>
        <div>
            {t('sendStatistic_statisticNote')}
        </div>
    </div>)
}

export default SendStatistic
