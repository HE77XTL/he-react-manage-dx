import React, {useEffect, useState} from 'react'

import {Input, Button, Modal, Form, Upload, Message, Descriptions} from 'caihrc'
import {DeleteOutlined, LinkOutlined} from '@ant-design/icons';
import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'

import iconText from "../../images/text.png";
import iconTextActive from "../../images/text_active.png";
import iconImg from "../../images/img.png";
import iconImgActive from "../../images/img_active.png";
import Events from "../../common/utils/Events";
import Api from '../../common/request/api/api'
import styles from './superSmsSend.module.less'
import {useTranslation} from "react-i18next";
import store from "store";


const SuperSmsSend = function () {
    const languageType = store.get('languageType') || 'en';
    const crumbs = [
        {
            value: 'superSmsSend',
            name: '超信发送任务',
            url: ''
        },
    ];
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const [uploadForm] = Form.useForm();
    const [onlyTxt, setOnlyTxt] = useState(t('superSmsSend_onlyTxt'))


    const [limitTips, setLimitTips] = useState({
        txt: t('superSmsSend_onlyTxt'),
        image: t('superSmsSend_onlyImage'),
    });

    const [uploadLabelCol, setUploadLabelCol] = useState(uploadLabelColChange(languageType));

    function getMaterialTypeDirections(type) {
        switch (type) {
            case 0:
                return t('superSmsSend_onlyTxt');
            case 1:
                return t('superSmsSend_onlyImage');
            default:
                return t('superSmsSend_onlyTxt');
        }
    }


    const [detailVisible, setDetailVisible] = useState(false);

    const [materialTypeList, setMaterialTypeList] = useState([
        {
            type: 0,
            icon: iconText,
            activeIcon: iconTextActive,
            active: true,
            text: '文本',
            directions: getMaterialTypeDirections(0)
        },
        {
            type: 1,
            icon: iconImg,
            activeIcon: iconImgActive,
            active: false,
            text: '图片',
            directions: getMaterialTypeDirections(1)
        }
    ]);

    const [materialList, setMaterialList] = useState([]);


    const [materialForm, setMaterialForm] = useState({
        type: 0,
        directions: getMaterialTypeDirections(0),
        fileList: []
    });


    useEffect(() => {
        Events.on("languageChange", languageChange);
        return () => {
            Events.off("languageChange", languageChange);
        }
    }, []);

    function languageChange(e) {
        console.log(e)
        const xxx = t('superSmsSend_onlyTxt')
        console.log(xxx)
        setOnlyTxt(t('superSmsSend_onlyTxt'))
        const yyy = {
            txt: t('superSmsSend_onlyTxt'),
            image: t('superSmsSend_onlyImage'),
        };

        setLimitTips(yyy)
        setUploadLabelCol(uploadLabelColChange(e))

    }


    // 选择文件弹框中label 宽度，根据不同语言进行设置

    function uploadLabelColChange(languageType) {
        switch (languageType) {
            case 'zh':
                return 4;
            case 'en':
                return 6;
            default:
                return 6;
        }
    }


    function onMaterialListDelete(index) {
        const newMaterialList = materialList.concat();
        newMaterialList.splice(index, 1);
        setMaterialList(newMaterialList)
    }

    function onFinish() {
        console.log(11111)
        console.log(form.getFieldsValue())
        console.log(materialList)
        //const result = contentValid();
        //confirmModel(result.message, result.status)
    }

    function onFinishFailed(errorInfo) {
        console.log(form.getFieldsValue())
        return;
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
        return {
            message: '123',
            status: '456'
        }
    };

    function confirmModel(message, type) {
        Modal.confirm({
            title: t('common_message'),
            okText: t('common_confirm'),
            cancelText: t('common_cancel'),
            content: message,
            onOk: () => {
                if (type === 'success') {
                    onSubmit()
                }
            }
        })
    }

    // 弹框------------------------
    function onMaterialTypeClick(item) {
        setMaterialForm(Object.assign({}, materialForm, {
            type: item.type,
            directions: getMaterialTypeDirections(item.type)
        }))
    }


    function onSubmit() {
        const formData = form.getFieldsValue();
        let data = new FormData();
        for (let key in formData) {
            if (key !== 'file') {
                data.append([key], [formData[key]]);
            }
        }
        // for (let item of contentList) {
        //     data.append('file', item.fileList[0]);
        // }
        Api.sendSuperSMS(data)
    }

    function onRemove(file) {
        console.log(file)
        setMaterialForm(Object.assign({}, materialForm, {
            fileList: []
        }));
    }

    function beforeUpload(file, fileList) {
        console.log(file)

        const validResult = materialForm.type === 0 ? uploadTextValid(file) : uploadImageValid(file)
        if (validResult) {
            setMaterialForm(Object.assign({}, materialForm, {
                fileList: [file]
            }));
        }
        return false
    }

    function uploadTextValid(file) {
        if (file.type !== 'text/plain') {
            Message.error('只能选择 .txt 文件')
            return false
        }
        if (file.size / 1024 > 300) {
            Message.error('文件不能超过300k')
            return false
        }
        return true
    }

    function uploadImageValid(file) {
        const imgTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!imgTypes.includes('file.type')) {
            Message.error('只能选择 img 文件');
            return false
        }
        if (file.size / 1024 > 300) {
            Message.error('文件不能超过300k');
            return false
        }
        return true
    }


    function getUploadBtnText() {
        switch (materialForm.type) {
            case 0:
                return t('superSmsSend_uploadText');
            case 1:
                return t('superSmsSend_uploadImage');
            default:
                return t('superSmsSend_uploadText');
        }
    }

    function getUploadAccept() {
        switch (materialForm.type) {
            case 0:
                return '.txt';
            case 1:
                return '.jpg,.jpeg,.png';
            default:
                return '.txt';
        }
    }


    function uploadModalConfirm() {
        console.log(materialForm)
        if (materialForm.fileList.length === 0) {
            const message = (materialForm.type === 0) ? t('superSmsSend_RCSTextNoEmpty') : t('superSmsSend_RCSImageNoEmpty')
            Message.error(message)
        }
        //materialList.push(materialForm);
        //                 setDetailVisible(false);
    }

    const uploadModal = (
        <Modal
            okText={t('common_confirm')}
            cancelText={t('common_cancel')}
            title={t('superSmsSend_contentType')}
            maskClosable={false}
            visible={detailVisible}
            onOk={uploadModalConfirm}
            onCancel={() => {
                setDetailVisible(false);
            }}
            initialWidth={600}
            initialHeight={300}
        >
            <div>
                <Form form={uploadForm} labelCol={{span: uploadLabelCol}}>
                    <Form.Item label={t('superSmsSend_materialType')}>
                        <div className={styles.materialWrap}>
                            {materialTypeList.map(item => {
                                return (<div className={styles.typePanel} onClick={e => {
                                    onMaterialTypeClick(item)
                                }}>
                                    <img src={item.type === materialForm.type ? item.activeIcon : item.icon}
                                         alt="logo"/>
                                    <div>{item.text}</div>
                                </div>)
                            })}
                        </div>
                    </Form.Item>
                    <Form.Item label={t('superSmsSend_materialUpload')}
                               name="file"
                               rules={[
                                   {
                                       required: true,
                                       validator: async () => {
                                           Promise.resolve('')
                                       },
                                   },
                               ]}>
                        <Upload action="#"
                                accept={getUploadAccept()}
                                maxCount={1}
                                customReques=""
                                fileList={materialForm.fileList}
                                onRemove={onRemove}
                                beforeUpload={beforeUpload}>
                            <Button>
                                {getUploadBtnText()}
                            </Button>
                        </Upload>
                        {materialForm.fileList.length > 0 ? (
                            <div style={{position: 'absolute', top: '56px', left: '6px'}}>
                                <LinkOutlined/>
                            </div>) : null}
                    </Form.Item>
                    <Form.Item label={t('superSmsSend_materialTips')}>
                        <div style={{lineHeight: '36px'}}>
                            {materialForm.directions}
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );


    return (<div className='dsContent'>
        <DsBreadcrumb crumbs={crumbs}/>
        <div className={styles.superSmsSend}>
            <Form form={form}
                  name="superSmsTask"
                  labelCol={{span: 4}}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}>
                <Form.Item
                    label="超信主题"
                    name="subject"
                >
                    <Input type="text" style={{width: '200px'}}/>
                </Form.Item>

                <Form.Item
                    label={t('superSmsSend_contentType')}
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
                        <div>
                            {materialList.map((material, index) => {
                                return (<div className={styles.uploadLine}>
                                    <div>类型 {material.type}</div>
                                    <div
                                        className={styles.fileName}>文件名 {material.fileList[0] && material.fileList[0].name} </div>
                                    <div style={{marginLeft: '20px'}}>排序:{index + 1} </div>
                                    <div className={styles.deleteIcon} onClick={e => {
                                        onMaterialListDelete(index)
                                    }}>
                                        <DeleteOutlined/>
                                    </div>
                                </div>)
                            })}
                        </div>
                        <div>
                            <Button onClick={e => {
                                setMaterialForm({
                                    type: 0,
                                    directions: getMaterialTypeDirections(0),
                                    fileList: []
                                });
                                setDetailVisible(true);
                            }}>+{t('superSmsSend_addRCSContent')}</Button>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    label={t('superSmsSend_receivePhone')}
                    name="toNumberList"
                    rules={[{required: true, message: t('superSmsSend_toNumberNoEmpty')}]}
                >
                    <Input type="textarea"
                           placeholder="可填写多个手机号码（以换行符进行分隔），例如：
                           13800138000
                           13800138001
                           13800138002"
                           autoSize={{minRows: 6}}
                           value="type=textarea" style={{width: '480px'}}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {t('common_submit')}
                    </Button>
                </Form.Item>
            </Form>
        </div>
        {uploadModal}
    </div>)
}

export default SuperSmsSend
