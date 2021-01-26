import React from 'react';
import {Button} from 'caihrc';

import Api from '../../common/request/api/api';

import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';

import XLSX from "xlsx";

import axios from 'axios'


const Dashboard = function () {

    function superSmsSend() {
        let data = new FormData();
        data.append('file', 'content');
        data.append('file', 'content21345689');
        data.append('templateName', '123');
        data.append('toNumberList', '123456789');
        data.append('subject', '123k');
        // axios({
        //     method: "Post",
        //     url: "http://10.17.34.96:8101/webapi/portal/sendSuperSMS",
        //     headers: {'Content-Type': 'multipart/form-data',},
        //     data: data
        // }).then(res => {
        //     console.log(res)
        // })


        Api.sendSuperSMS(data)
    }


    function exportExcel() {

    }


    return (<div className="dsContent">
        <div>
            <Button onClick={superSmsSend}>超信发送</Button>
        </div>
        <div>
            <Button onClick={exportExcel}>导出</Button>
        </div>

        <div>
            <div>国际化测试</div>
            <div>
                <FormattedMessage id="intl_breadcrumb"/>
            </div>
        </div>
    </div>)
}

export default Dashboard


/*
* 已解决！ //文件读取完后自动调用调用 methods: { afterRead(file) { // 此时可以自行将文件上传至服务器 console.log(file); console.log(file.file) let content = file.file; let data = new FormData(); data.append('uploadfile',content); var _this=this //必须使用原始axios this.axios({ method:"Post", url:"http://121.36.33.158:8585/user/upload_user_face", headers: { 'Content-Type': 'multipart/form-data', }, data:data }).then(function (res) { console.log(res) }).catch(function (error){ console.log(error) }) }, } 1.如果后端采用的是表单提交，那么我们需要用到FormData() 这个对象进行拼接数据 2.需设置headers里，'Content-Type': 'multipart/form-data',否则造成500错误 3.此处必须用原始axios请求 [/code]
*
*
* */
