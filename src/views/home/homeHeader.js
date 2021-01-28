import React, {useState, useEffect} from 'react';
import i18next from "i18next";

import styles from "./home.module.less";
import Logo from "../../images/logo.jpg";
import DsIcon from "../../components/dsIcon/dsIcon";
import Events from '../../common/utils/Events'
import Api from '../../common/request/api/api'
import utils from '../../common/utils/utils'
import {useHistory} from 'react-router-dom'
import store from 'store'
import {Button, Modal, Dropdown, Menu, Message, Form, Input} from 'caihrc'
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import AntZhCN from "caihrc/lib/locale/zh_CN";
import AntEnGB from "caihrc/lib/locale/en_GB";
import axios from "axios";


const HomeHeader = function (props) {
    const languageType = store.get('languageType') || 'en';
    const history = useHistory();
    const {t, i18n} = useTranslation();
    const user = store.get('user') || {}; // 能进入首页，而不跳转到登陆页，认为已经登陆了。即已经通过登陆接口获取到用户信息
    const languageOptions = [
        {
            type: 'zh',
            name: '中文',
        },
        {
            type: 'en',
            name: 'English',
        }
    ];

//--- useState ----------------------

    const [iconStyle, setIconStyle] = useState(iconFmt(props.collapse));
    const [iconState, setIconState] = useState('close');
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [editPassword, setEditPassword] = useState({
        oldPassword: '',
        newPassword: '',
        sureNewPassword: ''
    });
    const [useMoney, setUseMoney] = useState(0);
    const [language, setLanguage] = useState(getLanguageText(languageType));
    const [editPasswordLabelCol, setEditPasswordLabelCol] = useState(passwordLabelColChange(languageType));


//--- useEffect ------------------------

    useEffect(() => {
        initData()
    }, []);

//--- function --------------------
    function initData() {
        Api.getCredit().then(res => {
            if (res) {
                setUseMoney(res.credit)
            }
        })
    }

    function updateEditPassword(e) {
        setEditPassword(Object.assign({}, editPassword, e))
    }


    function onCollapseChange() {
        // 简单的父子组件，可以通过父组件传递回调函数进行事件传递
        // 使用 Events 要记得 清除订阅
        setIconStyle(iconFmt(!props.collapse));
        Events.emit("collapse", !props.collapse);
    }

    function iconFmt(collapse) {
        return collapse
            ? {name: 'ds-icon-arrow-right', color: '#00AAFF'}
            : {name: 'ds-icon-arrow-left', color: '#333'}
    }

    function languageChange(item) {
        i18next.changeLanguage(item.type).catch(() => {
            Message.error("change language fail")
        });

        store.set("languageType", item.type);
        axios.defaults.headers.languageType = utils.languageTypeFmt(item.type);

        Events.emit("languageChange", item.type);
        setLanguage(item.name);
        setEditPasswordLabelCol(passwordLabelColChange(item.type))
    }


    function logout() {
        Modal.confirm({
            title: t('home_logoutConfirm'),
            cancelText: t('home_cancel'),
            okText: t('home_confirm'),
            onOk: () => {
                Api.logout().then(res => {
                    if (res) {
                        Message.success(t('home_logoutSuccess'));
                        // 清除token 就好
                        // 其他信息需要保留
                        store.remove('token');
                        history.push('/login');
                    }
                })
            },
        });
    }

    // 修改密码弹框中label 宽度，根据不同语言进行设置

    function passwordLabelColChange(languageType) {
        switch (languageType) {
            case 'zh':
                return 5;
            case 'en':
                return 7;
            default:
                return 7;
        }
    }

    function getLanguageText(languageType) {
        let text = 'English'
        for (let item of languageOptions) {
            if (languageType === item.type) {
                text = item.name
            }
        }
        return text
    }


    const editPasswordModal = (
        <Modal
            okText={t('home_confirm')}
            cancelText={t('home_cancel')}
            title={t('home_modifyPassword')}
            maskClosable={false}
            visible={editFormVisible}
            onOk={() => {
                const params = Object.assign({}, editPassword, {
                    loginAccount: user.loginAccount,
                    id: user.id,
                });
                Api.modifyPassword(params).then(res => {
                    if (res) {
                        Message.success(t('home_editSuccess'));
                        setEditFormVisible(false);
                        history.push('/login')
                    }
                });
                setIconState('close');

            }}
            onCancel={() => {
                // form.resetFields();
                setEditFormVisible(false);
                setIconState('close');
            }}
        >
            <Form labelCol={{span: editPasswordLabelCol}} style={{paddingRight: '12px'}}>
                <Form.Item
                    label={t('home_oldPassword')}
                    name="oldPassword"
                    rules={[{required: true, message: t('home_oldPasswordPlaceholder')}]}>
                    <Input.Password
                        value={editPassword.oldPassword}
                        onChange={(e) => {
                            updateEditPassword({oldPassword: e.target.value})
                        }}/>
                </Form.Item>
                <Form.Item
                    label={t('home_newPassword')}
                    name="newPassword"
                    rules={[{required: true, message: t('home_newPasswordPlaceholder')}]}>
                    <Input.Password
                        value={editPassword.newPassword}
                        onChange={(e) => {
                            updateEditPassword({newPassword: e.target.value})
                        }}/>
                </Form.Item>
                <Form.Item
                    label={t('home_newPasswordConfirm')}
                    name="sureNewPassword"
                    rules={[{required: true, message: t('home_newPasswordAgain')}]}>
                    <Input.Password
                        value={editPassword.sureNewPassword}
                        onChange={(e) => {
                            updateEditPassword({sureNewPassword: e.target.value})
                        }}/>
                </Form.Item>
            </Form>
        </Modal>
    );


    const menu = (
        <Menu>
            <Menu.Item>
                <a onClick={() => {
                    setEditPassword({});
                    setEditFormVisible(true);
                }}> {t('home_modifyPassword')}</a>
            </Menu.Item>
        </Menu>
    );

    const LanguageNode = (
        <Menu>
            {languageOptions.map((item, index) => {
                return (<Menu.Item key={index}>
                    <a onClick={() => {
                        languageChange(item)
                    }}>{item.name}</a>
                </Menu.Item>)
            })}
        </Menu>
    );


    return (<div className={styles.homeHeader}>
        <img src={Logo} className={styles.logo} alt="logo"/>
        <div style={{flex: 1}}>
            <div className={styles.collapseButton} onClick={onCollapseChange}>
                <DsIcon
                    size="24"
                    color={iconStyle.color}
                    name={iconStyle.name}
                />
            </div>
        </div>
        <div>
            {t('home_userCredit')} : <span className="dsRed">{utils.emptyFilter(useMoney)}</span>
        </div>
        <div className={styles.user}>
            <Dropdown overlay={menu}
                      trigger="click"
                      placement="bottomCenter"
                      onVisibleChange={visible => {
                          setIconState(visible ? 'open' : 'close');
                      }}>
                <a onClick={e => e.preventDefault()} className={styles.userName}>
                    {user.userName} {iconState == 'close' ? <DownOutlined/> : <UpOutlined/>}
                </a>
            </Dropdown>
            {editPasswordModal}
        </div>
        <div className={styles.language}>
            <Dropdown overlay={LanguageNode}
                      trigger="click"
                      placement="bottomCenter"
                      onVisibleChange={visible => {
                          setIconState(visible ? 'open' : 'close');
                      }}>
                <a onClick={e => e.preventDefault()} className={styles.userName}>
                    {language} {iconState == 'close' ? <DownOutlined/> : <UpOutlined/>}
                </a>
            </Dropdown>
            {editPasswordModal}
        </div>
        <div>
            <Button style={{width:'60px'}} type="primary" size="exSmall" onClick={logout}>{t('home_logout')}</Button>
        </div>
    </div>)
};

export default HomeHeader
