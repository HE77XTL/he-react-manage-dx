import React, {useState} from 'react'

import {Input, Button, Modal, Form, Upload, Message} from 'caihrc'
import {DeleteOutlined, LinkOutlined} from '@ant-design/icons';
import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'
import classnames from 'classnames'

import Api from '../../common/request/api/api'


import styles from './superSmsSend.module.less'

const SuperSmsSend = function () {
    const crumbs = [
        {
            value: 'superSmsSend',
            name: '超信发送任务',
            url: ''
        },
    ];
    const [form] = Form.useForm();

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
        contentFmt.type = e;
        const newContentList = contentList.concat();
        newContentList.splice(index, 1, contentFmt);
        console.log(newContentList)
        setContentList(newContentList)
    }

    function onFinish() {
        const result = contentValid();
        confirmModel(result.message, result.status)
    }

    function onFinishFailed(errorInfo) {
        // 判断验证不通过第一项是不是 模板名称
        console.log('Failed:', errorInfo.errorFields[0]);
        const errName = errorInfo.errorFields[0].name;
        const mes = errorInfo.errorFields[0].errors.join('') || '请填写完整';
        if (errName.includes('templateName')) {
            confirmModel(mes);
            return
        }
        const result = contentValid();
        if (result.status === 'fail') {
            confirmModel(result.message);
            return
        }
        confirmModel(mes);
    }


    // 超信内容自定义校验规则

    const contentValid = () => {
        let validResult = {
            status: 'success',
            message: '是否确认提交？'
        };

        if (contentList.length === 0) {
            validResult.status = 'fail';
            validResult.message = '请添加超信内容';
        }
        for (let fileObj of contentList) {
            if (!fileObj.fileList || fileObj.fileList.length === 0) {
                if (fileObj.type === 0) {
                    // 文本
                    validResult.status = 'fail';
                    validResult.message = '请添加超信文本';
                } else {
                    // 图片
                    validResult.status = 'fail';
                    validResult.message = '请添加超信图片';
                }
                break
            }
        }
        return validResult
    }

    function confirmModel(message, type) {
        Modal.confirm({
            title: '提示',
            okText: '确认',
            cancelText: '取消',
            content: message,
            onOk: () => {
                if (type === 'success') {
                    onSubmit()
                }
            }
        })
    }


    function onSubmit() {
        const formData = form.getFieldsValue();
        let data = new FormData();
        for (let key in formData) {
            if (key !== 'file') {
                data.append([key], [formData[key]]);
            }
        }
        for (let item of contentList) {
            data.append('file', item.fileList[0]);
        }
        Api.sendSuperSMS(data)
    }


    return (<div className='dsContent'>
        <DsBreadcrumb crumbs={crumbs}/>
        <div className={styles.superSmsSend}>
            <Form form={form} name="superSmsTask" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="模板名称"
                    name="templateName"
                    rules={[{required: true, message: '请添加任务名称'}]}
                >
                    <Input type="text" style={{width: '200px'}}/>
                </Form.Item>

                <Form.Item
                    label="内容类型"
                    name="file"
                    rules={[
                        {
                            required: true,
                            validator: async () => {
                                Promise.resolve('')
                            },
                        },
                    ]}
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
                    label="超信主题"
                    name="subject"
                    rules={[{required: true, message: '请添加超信主题'}]}
                >
                    <Input type="text" style={{width: '200px'}}/>
                </Form.Item>
                <Form.Item
                    label="接收号码"
                    name="toNumberList"
                    rules={[{required: true, message: '发送号码不能为空'}]}
                >
                    <Input type="textarea"
                           autoSize={{minRows: 6}}
                           value="type=textarea" style={{width: '480px'}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>)
}

export default SuperSmsSend
