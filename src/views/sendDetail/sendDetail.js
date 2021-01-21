import React from 'react'
import {Table, Space} from 'caihrc'

import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'


import DsSearchBox from '../../components/dsSearchBox/dsSearchBox'


const SendDetail = function () {
    const crumbs = [
        {
            value: 'sendDetail',
            name: '发送明细',
            url: ''
        },
    ];


    const dataSource = Array.from({length: 100}, (item, index) => {
        return {
            key: index,
            msmType: '类型',
            phone: '132456893',
            content: 32,
            country: '中国',
            status: 'success',
            billing: '是',
            amount: '99',
            reqTime: '2021-01-01',
            receiveTime: '2021-01-01',
            address: '西湖区湖底公园1号',
        }
    })

    const columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            align: 'center',
            render(text, record, index) {
                return index
            }
        },
        {
            title: '短信类型',
            dataIndex: 'msmType',
            key: 'msmType',
            align: 'center',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center',
        },
        {
            title: '短信内容',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
        },
        {
            title: '国家',
            dataIndex: 'country',
            key: 'country',
            align: 'center',
        },
        {
            title: '发送状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: '是否计费',
            dataIndex: 'billing',
            key: 'billing',
            align: 'center',
        },
        {
            title: '计费金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
        },
        {
            title: '请求时间',
            dataIndex: 'reqTime',
            key: 'reqTime',
            align: 'center',
        },
        {
            title: '送达时间',
            dataIndex: 'receiveTime',
            key: 'receiveTime',
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <div>
                    <div>详情</div>
                </div>
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
            key: 'countTime',
            type: 'date',
            name: '选择时间',
            searchValue: '',
            placeholder: '请选择',
        },
        {
            key: 'smsType',
            type: 'select',
            name: '短信类型',
            searchValue: 0,
            options: [
                {"label": "类型A", "value": 0},
                {"label": "类型B", "value": 1},
                {"label": "类型C", "value": 2}],
            placeholder: '请选择',
        },
        {
            key: '2',
            type: 'date',
            name: '日期选择',
            searchValue: '',
            placeholder: '请选择',
        },

    ];
    return (<div className='dsContent' style={{minWidth: '1200px'}}>
        <DsBreadcrumb crumbs={crumbs}/>
        <DsSearchBox searcitems={searchItems}/>
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={pagination} bordered/>
        </div>
    </div>)
}

export default SendDetail
