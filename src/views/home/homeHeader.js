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


const HomeHeader = function (props) {
    const history = useHistory();
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

    const [language, setLanguage] = useState('English');


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
        Events.emit("languageChange", item.type);
        setLanguage(item.name);
    }


    function logout() {
        Modal.confirm({
            title: '确认退出吗?',
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                Api.logout().then(res => {
                    if (res) {
                        Message.error('退出成功！');
                        store.clearAll();
                        history.push('/login');
                    }
                })
            },
        });
    }


    const editPasswordModal = (
        <Modal
            okText="确定"
            cancelText="取消"
            title="修改密码"
            maskClosable={false}
            visible={editFormVisible}
            onOk={() => {
                const params = Object.assign({}, editPassword, {
                    loginAccount: user.loginAccount,
                    id: user.id,
                });
                Api.modifyPassword(params).then(res => {
                    if (res) {
                        Message.success("修改成功");
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
            initialWidth={600}
            initialHeight={300}
        >
            <Form labelCol={{span: 5}} style={{paddingRight: '12px'}}>
                <Form.Item
                    label="原密码"
                    name="oldPassword"
                    rules={[{required: true, message: '请输入原密码'}]}>
                    <Input.Password
                        value={editPassword.oldPassword}
                        onChange={(e) => {
                            updateEditPassword({oldPassword: e.target.value})
                        }}/>
                </Form.Item>
                <Form.Item
                    label="新密码"
                    name="newPassword"
                    rules={[{required: true, message: '请输入新密码'}]}>
                    <Input.Password
                        value={editPassword.newPassword}
                        onChange={(e) => {
                            updateEditPassword({newPassword: e.target.value})
                        }}/>
                </Form.Item>
                <Form.Item
                    label="确认新密码"
                    name="sureNewPassword"
                    rules={[{required: true, message: '请再次输入新密码'}]}>
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
                }}>修改密码</a>
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
            可用额度: <span className="dsRed">{utils.emptyFilter(useMoney)}</span>
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
            <Button type="primary" size="exSmall" onClick={logout}>退出</Button>
        </div>
    </div>)
};

export default HomeHeader
