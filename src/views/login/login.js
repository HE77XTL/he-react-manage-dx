import React, {useState} from 'react';
import axios from 'axios';
import {Form, Input, Button} from 'caihrc';
import {UserOutlined, LockOutlined, ReloadOutlined, SafetyCertificateOutlined} from '@ant-design/icons';

import apiConfig from "../../common/request/api.config";

import { useHistory } from "react-router-dom";

import Api from '../../common/request/api/api'
//import utils from '../../common/utils/utils'

import styles from './login.module.less'


const Login = function (props) {
    const history = useHistory();

    const [loginForm, setLoginForm] = useState({
        loginAccount: '',
        password: '',
        verification: ''
    });


    const {webapi} = apiConfig.getApiRoot();
    const [validImgSrc, setValidImgSrc] = useState(getValidImgSrc());


    function updateLoinForm(e) {
        setLoginForm(Object.assign({}, loginForm, e))
    }


    // 跟新验证码图片地址
    function getValidImgSrc() {
        const time = (new Date()).getTime();
        return `${webapi}/verificationCode?time=${time}`
    }

    // 刷新验证码图片
    function validImgSrcUpdate() {
        //     //防抖
        setValidImgSrc(getValidImgSrc())
    }


    async function onFinish() {
        Api.login(loginForm).then(res => {
            if (!res) return false;

            localStorage.setItem('user', JSON.stringify(res));
            localStorage.setItem('menuList', JSON.stringify(res.menuList));
            localStorage.setItem('token', res.token);


            axios.defaults.headers.token = res.token;
            history.push('/dashboard')
        })
    }

    function onFinishFailed() {
        console.log('onFinishFailed')
    }


    return (
        <div className={styles.login}>
            <div className={styles.formPanel}>
                <h2 className={styles.title}>短信可视化平台</h2>
                <Form
                    requiredMark={false}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="loginAccount"
                        rules={[{required: true, message: '请输入账号'}]}>
                        <Input value={loginForm.loginAccount}
                               onChange={(e) => {
                                   updateLoinForm({loginAccount: e.target.value})
                               }}
                               size="large"
                               placeholder="请输入账号"
                               prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码'}]}>
                        <Input.Password
                            value={loginForm.password}
                            onChange={(e) => {
                                updateLoinForm({password: e.target.value})
                            }}
                            size="large"
                            placeholder="请输入密码"
                            prefix={<LockOutlined/>}/>
                    </Form.Item>
                    <div className={styles.validItem}>
                        <Form.Item
                            name="verification"
                            rules={[{required: true, message: '请输入验证码'}]}>
                            <Input value={loginForm.verification}
                                   onChange={(e) => {
                                       updateLoinForm({verification: e.target.value})
                                   }}
                                   size="large"
                                   placeholder="请输入验证码"
                                   prefix={<SafetyCertificateOutlined/>}/>
                        </Form.Item>
                        <img src={validImgSrc} alt="validImg" className={styles.validImg}/>
                        <div className={[styles.refresh]} onClick={validImgSrcUpdate}>
                            <ReloadOutlined/>
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            登陆
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default Login
