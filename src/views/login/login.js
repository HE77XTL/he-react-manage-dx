import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Form, Input, Button} from 'caihrc';
import {UserOutlined, LockOutlined, ReloadOutlined, SafetyCertificateOutlined} from '@ant-design/icons';

import apiConfig from "../../common/request/api.config";
import Api from '../../common/request/api/api'
import styles from './login.module.less'


import store from 'store'
import {useTranslation} from "react-i18next";


const Login = function (props) {
    const {t, i18n} = useTranslation();


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

            store.set('user', res);
            store.set('menuList', res.menuList);
            store.set('token', res.token);

            axios.defaults.headers.token = res.token;
            history.push('/sendStatistic')
        })
    }

    function onFinishFailed() {
        console.log('onFinishFailed')
    }


    return (
        <div className={styles.login}>
            <div className={styles.formPanel}>
                <h2 className={styles.title}>{t('login_title')}</h2>
                <Form
                    requiredMark={false}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        name="loginAccount"
                        rules={[{
                            required: true,
                            pattern: /^(?![0-9]$)(?![a-zA-Z]$)[0-9A-Za-z]{2,50}$/,
                            message: t('login_userNamePlaceholder')
                        }]}>
                        <Input value={loginForm.loginAccount}
                               onChange={(e) => {
                                   updateLoinForm({loginAccount: e.target.value})
                               }}
                               size="large"
                               placeholder={t('login_userNamePlaceholder')}
                               prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: t('login_passwordPlaceholder')}]}>
                        <Input.Password
                            value={loginForm.password}
                            onChange={(e) => {
                                updateLoinForm({password: e.target.value})
                            }}
                            size="large"
                            placeholder={t('login_passwordPlaceholder')}
                            prefix={<LockOutlined/>}/>
                    </Form.Item>
                    <div className={styles.validItem}>
                        <Form.Item
                            name="verification"
                            rules={[{required: true, message: t('login_validCodePlaceholder')}]}>
                            <Input value={loginForm.verification}
                                   onChange={(e) => {
                                       updateLoinForm({verification: e.target.value})
                                   }}
                                   size="large"
                                   placeholder={t('login_validCodePlaceholder')}
                                   prefix={<SafetyCertificateOutlined/>}/>
                        </Form.Item>
                        <img src={validImgSrc} alt="validImg" className={styles.validImg}/>
                        <div className={[styles.refresh]} onClick={validImgSrcUpdate}>
                            <ReloadOutlined/>
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            {t('login_loginBtnText')}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default Login
