import React, {useState} from 'react'

import {Input, Button, Modal, Form, Upload, Message} from 'caihrc'
import {DeleteOutlined, LinkOutlined} from '@ant-design/icons';
import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'
import classnames from 'classnames'

import store from "store";

import Api from '../../common/request/api/api'


import styles from './superSmsSend.module.less'

const SuperSmsSend = function () {
    const user = store.get('user');

    const [contentList, setContentList] = useState([
        {
            type: 0,
            fileList: [],
            tipsText: '仅支持.txt格式'
        }, {
            type: 0,
            fileList: [],
            tipsText: '仅支持.txt格式'
        }
    ]);

    const crumbs = [
        {
            value: 'superSmsSend',
            name: '超信发送任务',
            url: ''
        },
    ];

    function upLoadChange(info, item, index) {
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        const newContentList = contentList.concat();
        newContentList[index].fileList = fileList;
        setContentList(newContentList)
    }

    function contentDelete(item, index) {
        const newContentList = contentList.concat();
        newContentList.splice(index, 1)
        setContentList(newContentList)
    }


    function addContent() {
        setContentList(contentList.concat([{
            type: 0,
            fileList: [],
            tipsText: '仅支持.txt格式'
        }]))
    }

    function contentTypeChange(e, item, index) {
        const tipsText = e === 1 ? '仅支持.jpg、.jpeg、.png 格式，大小不超过2M' : '仅支持.txt格式';
        const contentFmt = contentList[index];
        contentFmt.tipsText = tipsText;
        const newContentList = contentList.concat();
        newContentList.splice(index, 1, contentFmt);
        setContentList(newContentList)
    }


    return (<div className='dsContent'>
        <DsBreadcrumb crumbs={crumbs}/>
        <div className={styles.superSmsSend}>
            <Form>
                <Form.Item
                    label="模板名称"
                    name="templateName"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input type="text" style={{width: '200px'}}/>
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <div>
                        {contentList.map((contentItem, index) => {
                            return (
                                <div className={styles.uploadLine}>
                                    <Input type="select" defaultValue={contentItem.type} options={[
                                        {"label": "超信文本", "value": 0},
                                        {"label": "超新图片", "value": 1},
                                    ]} onChange={(e) => {
                                        contentTypeChange(e, contentItem, index)
                                    }} style={{width: '160px'}} className={styles.lineItem}/>
                                    <div className={styles.uploadItemWrap}>
                                        <Input.Upload
                                            onChange={(e) => {
                                                upLoadChange(e, contentItem, index)
                                            }}
                                            customRequest={(e) => {
                                                console.log(e)
                                            }}
                                            fileList={contentItem.fileList}
                                            showUploadList={{showRemoveIcon: false}} className={styles.lineItem}>
                                            <Button style={{width: '150px'}}>点击上传</Button>
                                        </Input.Upload>
                                        {/*也不知道什么默认得图标没出来*/}
                                        {/*只可以上传一项文件，暂时用定位得方式来做了*/}
                                        <div className={styles.linkIcon}>
                                            {contentItem.fileList.map(() => {
                                                return <LinkOutlined/>
                                            })}
                                        </div>
                                    </div>
                                    <div className={classnames(styles.lineItem, styles.lineMes)}>
                                        <div style={{width: '300px'}}>{contentItem.tipsText}</div>
                                        <div className={styles.showOrder}>展示顺序: {index}</div>
                                        <DeleteOutlined className={styles.deleteIcon} onClick={e => {
                                            contentDelete(contentItem, index)
                                        }}/>
                                    </div>
                                </div>
                            )
                        })}

                        <div style={{width: '300px'}}>
                            <Button block onClick={() => {
                                addContent()
                            }}>添加超信内容</Button>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    label="接收号码"
                    name="toNumber"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input type="textarea"
                           autoSize={{minRows: 6}}
                           value="type=textarea" style={{width: '480px'}}/>
                </Form.Item>
            </Form>
            <div>
                <Button type="primary">提交</Button>
            </div>
        </div>
    </div>)
}

export default SuperSmsSend
