import React from 'react';
import {Button, Input, Upload, Message} from 'caihrc';
import Api from '../../common/request/api/api'
import {Link} from 'react-router-dom'
import store from "store";
import styles from "../superSmsSend/superSmsSend.module.less";

import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';

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

    function onSubmit() {

        //sendSuperSMS
        fetch('http://10.8.11.61:8101/portal/sendSuperSMS', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                token: user.token
            },
            body: JSON.stringify({
                templateName: 'test',
                toNumberList: '6012345678;6212345678'
            }),
        }).then(res => res.json())

    }

    function upLoafChange(data) {
        let formData = new FormData();
        formData.append('file', data.file);
        formData.append('toNumberList', '6212345678');
        formData.append('templateName', 'test');

        console.log(formData)

        //templateName:test
        // toNumberList:6012345678;6212345678
        fetch('http://10.8.11.61:8101/portal/sendSuperSMS', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                // token: user.token
            },
            body: formData,
        }).then(res => res.json())


        // Api.sendSuperSMS(formData).then(res => {
        //
        // })

        console.log('data8888')
        console.log(data)
        console.log(data.file)
        console.log(typeof data.file)
        console.log('data888877')
    }


    const props = {
        name: 'file',
        action: 'http://10.8.11.61:8101/portal/sendSuperSMS',
        headers: {},
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                Message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                Message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    function handleUpload(data) {
        const formData = new FormData();

        console.log('data')
        console.log(data)

    //     fileList.forEach((file) => {   // fileList 是要上传的文件数组
    //         formData.append('files[]', file);
    //     });
    //
    //     fetch(url: 'http:just.a.url.demo', {
    //         method: 'POST',
    //         headers: {
    //             credentials: 'same-origin'
    //             // 'Content-Type': 'multipart/form-data'  // 不要加上这个文件类型说明
    //         },
    //         body: formData
    //
    //     })
    // .then(response => response.json())
    //         .catch(error => console.error('Error:', error))
    //         .then(response => console.log('Success:', response));



    }



    return (<div className='dsContent'>
        <div>
            DashBoard
        </div>
        <div style={{margin: '30px'}}>
            <Upload {...props}>
                <Button icon={<UploadOutlined/>}>Click to Upload</Button>
            </Upload>
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
        <div style={{margin: '10px'}}>
            <Link to="/superSmsSend">
                <Button>超信发送</Button>
            </Link>
        </div>

        <div style={{margin: '10px'}}>
            <Button onClick={() => {
                onSubmit()
            }}>添加超信接口测试</Button>
        </div>

        <div>
            <Input.Upload customRequest={handleUpload}>
                <Button style={{width: '150px'}}>点击上传</Button>
            </Input.Upload>

        </div>

        <div>
            <Button onClick={()=> {
                store.set('token', '6f11e61d34ef34877a59f4f72a0d59ff')
            }}>setToken</Button>
        </div>


    </div>)
};


export default DashBoard
