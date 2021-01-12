import React from 'react';
import {Button} from 'caihrc';
import Api from '../../common/request/api/api'

const DashBoard = function () {

    function apiTest() {
        console.log('apiTest')
        Api.queryAllProductName({})
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
    </div>)
};

export default DashBoard
