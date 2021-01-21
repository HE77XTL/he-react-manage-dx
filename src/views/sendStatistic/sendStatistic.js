import React from 'react'
import {Table, Input, Space} from 'caihrc'
import classNames from 'classnames'

import styles from './sendStatistic.module.less'

import DsSearchBox from '../../components/dsSearchBox/dsSearchBox'

import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'


const SendStatistic = function () {
    const crumbs = [
        {
            value: 'sport',
            name: '运动',
            url: '/login'  // 测试
        },
        {
            value: 'aaaa',
            name: '球类',
            url: ''
        },
        {
            value: 'sss',
            name: '羽毛球',
            url: ''
        }
    ];
    console.log(classNames('foo', styles.number))

    const summary = [
        {
            title: '当月成功发送数',
            number: 1199909,
            unit: '条'
        },
        {
            title: '当月消耗金额',
            number: 1199909,
            unit: '条'
        }
    ]

    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            key: '3',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            key: '4',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }, {
            key: '5',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }, {
            key: '6',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }, {
            key: '7',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
    ];

    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>详情</a>
                    <a>编辑</a>
                    <a>删除</a>
                </Space>
            ),
        },
    ];
    const pagination = {
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        total: 200,
        showTotal: (total) => {
            return '共' + total + '条数据';
        }
    };

    const searchItems = [
        {
            key: '1',
            type: 'text',
            name: '输入',
            searchValue: '22',
            placeholder: '请输入。。。',
        },
        {
            key: '2',
            type: 'date',
            name: '日期选择',
            searchValue: '',
            placeholder: '请选择',
        },
        {
            key: '3',
            type: 'select',
            name: 'select 选择',
            searchValue: 'aaaa',
            options: [
                {"label": "aaaa", "value": "aaaa"},
                {"label": "bbbb", "value": "bbbb"},
                {"label": "cccc", "value": "cccc"}],
            placeholder: '请选择',
        }
    ];


    const SummaryPanel = function ({data}) {
        return (
            <div className={classNames('ds-border', styles.panel)}>
                <div>{data.title}</div>
                <div className={styles.numberLine}>
                    <div className={styles.number}>{data.number}</div>
                    <div className={styles.unit}>{data.unit}</div>
                </div>
            </div>
        )
    }


    return (<div className='dsContent'>
        <DsBreadcrumb crumbs={crumbs} />
        {/*<div className={styles.searchBox}>*/}
        {/*    <DsSearchBox searcitems={searchItems}/>*/}
        {/*</div>*/}

        <div className={styles.summary}>
            {summary.map(summaryItem => {
                return <SummaryPanel data={summaryItem}/>
            })}
        </div>
        <div>
            注：展示当月数据概况（更新至昨日）
        </div>
        {/*<div>*/}
        {/*    <Table dataSource={dataSource} columns={columns} pagination={pagination} bordered/>*/}
        {/*</div>*/}
    </div>)
}

export default SendStatistic
