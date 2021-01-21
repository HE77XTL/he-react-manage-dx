import React from 'react';
import {Button} from 'caihrc';
import Api from '../../common/request/api/api'
import {Link} from 'react-router-dom'
import store from "store";

const DashBoard = function () {
    const user = store.get('user');

    function apiTest() {
        console.log('apiTest')
        Api.querySmsItemList({})
    }

    function fetchTest() {
        fetch('//10.17.34.96:8101/webapi/operation/querySmsItemList', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: user.token
            },
            body: JSON.stringify({}),
        }).then(res => res.json())
    }


    return (<div className='dsContent'>
        <div>
            DashBoard
        </div>
        <div>
            <p>fdsokij;lkjfdas;lkjfdslkj;fds;lkjfds</p>
            <p>fdsokij;lkjfdas;lkjfdslkj;fds;lkjfds</p>
        </div>
        <div>
            <Button onClick={apiTest}>接口测试</Button>
        </div>
        <div style={{margin: '10px'}}>
            <Link to="/sendStatistic">
                <Button>发送统计</Button>
            </Link>
        </div>
        <div style={{margin: '10px'}}>
            <Link to="/sendDetail">
                <Button>发送明细</Button>
            </Link>
        </div>
        <div>
            <Button onClick={fetchTest}>fetch接口测试</Button>
        </div>
    </div>)
};


export default DashBoard
