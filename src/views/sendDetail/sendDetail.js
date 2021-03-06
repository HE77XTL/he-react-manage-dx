import React, {useState, useEffect} from 'react'
import {Table, Button, Modal, Descriptions, Tooltip} from 'caihrc'
import {useHistory} from "react-router-dom";

import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'
import DsSearchBox from '../../components/dsSearchBox/dsSearchBox'
import Api from "../../common/request/api/api";
import store from "store";
import utils from '../../common/utils/utils'

import DsExcelExport from '../../common/utils/dsExcelExport'
import {useTranslation} from "react-i18next";

import Events from "../../common/utils/Events";

const SendDetail = function () {
    const history = useHistory();
    const user = store.get('user');
    const {t} = useTranslation();
    if (!user) {
        history.push('/login');
    }
    const initPagination = {
        current: 1,
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        total: 1,
        showTotal: (total) => {
            return t('sendDetail_total', {total});
        },
    };

    const [sendStatus, setSendStatus] = useState([
        {label: t('common_sending'), value: '99001'},
        {label: t('common_success'), value: '99002'},
        {label: t('common_fail'), value: '99003'}])


    const [tableData, setTableData] = useState([]);
    const [searchForm, setSearchForm] = useState({
        page: 1,
        pageSize: 10,
    });
    const [pagination, setPagination] = useState(initPagination);
    const [searchLabel, setSearchLabel] = useState({
        createTime: t('sendDetail_selectTime'),
        type: t('sendDetail_smsType'),
        toNumber: t('sendDetail_toNumber'),
        status: t('sendDetail_sendStatus'),
    });


    const searchItems = [
        {
            key: 'createTime',
            type: 'date',
            name: searchLabel.createTime,
            searchValue: '',
            placeholder: t('sendDetail_selectTime'),
        },
        {
            key: 'type',
            type: 'select',
            name: searchLabel.type,
            searchValue: '',
            options: [],
            placeholder: t('sendDetail_smsType'),
        },
        {
            key: 'toNumber',
            type: 'number',
            name: searchLabel.toNumber,
            searchValue: '',
            placeholder: t('sendDetail_toNumber'),
        },
        {

            key: 'status',
            type: 'select',
            name: searchLabel.status,
            searchValue: "",
            options: sendStatus,
            placeholder: t('sendDetail_sendStatus'),
        },

    ];
    const [searchBoxData, setSearchBoxData] = useState(searchItems);
    const [smsTypeOptions, setSmsTypeOptions] = useState([]);

    // 详情弹框（展示的和列表信息都一样，私以为，可以不要）
    const [detailVisible, setDetailVisible] = useState(false);
    const [smsDetail, setSmsDetail] = useState({});


    useEffect(() => {
        initData();
    }, []);
    useEffect(() => {
        Events.on("languageChange", languageChange);
        return () => {
            Events.off("languageChange", languageChange);
        }
    }, []);

    function languageChange(e) {
        setSendStatus([
            {label: t('common_sending'), value: '99001'},
            {label: t('common_success'), value: '99002'},
            {label: t('common_fail'), value: '99003'}])
        setSearchBoxData([
            {
                key: 'createTime',
                type: 'date',
                name: t('sendDetail_selectTime'),
                searchValue: '',
                placeholder: t('sendDetail_selectTime'),
            },
            {
                key: 'type',
                type: 'select',
                name: t('sendDetail_smsType'),
                searchValue: '',
                options: [],
                placeholder: t('sendDetail_smsType'),
            },
            {
                key: 'toNumber',
                type: 'number',
                name: t('sendDetail_toNumber'),
                searchValue: '',
                placeholder: t('sendDetail_toNumber'),
            },
            {

                key: 'status',
                type: 'select',
                name: t('sendDetail_sendStatus'),
                searchValue: "",
                options: [
                    {label: t('common_sending'), value: '99001'},
                    {label: t('common_success'), value: '99002'},
                    {label: t('common_fail'), value: '99003'}],
                placeholder: t('sendDetail_sendStatus'),
            },

        ])
    }

    async function initData() {
        await getSendType();// table 中的短信类型翻译需要先获取到数据
        getTables({
            page: 1,
            pageSize: 10,
        })
    }


    const crumbs = [
        {
            value: 'sendDetail',
            name: t('sendDetail'),
            url: ''
        },
    ];


    const columns = [
        {
            title: t('common_serialNumber'),
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            align: 'center',
            render(text, record, index) {
                return index + 1
            }
        },
        {
            title: t('sendDetail_smsType'),
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text, record) => {
                return utils.typeTranslate(record.type, 'typeCode', 'typeDesc', smsTypeOptions)
            }
        },
        {
            title: t('common_phoneNumber'),
            dataIndex: 'toNumber',
            key: 'toNumber',
            align: 'center',
        },
        // {
        //     title: t('sendDetail_RCSTemplate'),
        //     dataIndex: 'templateName',
        //     key: 'templateName',
        //     align: 'center',
        // },
        {
            title: t('sendDetail_smsContent'),
            dataIndex: 'message',
            key: 'message',
            align: 'center',
            width: 200,
            render: (text, record) => {
                return messageNode(record.message)
            }
        },
        {
            title: t('common_country'),
            dataIndex: 'countryName',
            key: 'countryName',
            align: 'center',
        },
        {
            title: t('sendDetail_sendStatus'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, record) => {
                return utils.typeTranslate(
                    record.status,
                    'value',
                    'label',
                    sendStatus
                )
            }
        },
        {
            title: t('sendDetail_isBilling'),
            dataIndex: 'isBilling',
            key: 'isBilling',
            align: 'center',
            render: (text, record) => {
                return utils.typeTranslate(
                    record.isBilling,
                    'value',
                    'name',
                    [
                        {
                            value: 0,
                            name: '否'
                        },
                        {
                            value: 1,
                            name: '是'
                        }]
                )
            }
        },
        {
            title: t('sendDetail_amount'),
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: t('sendDetail_requestTime'),
            dataIndex: 'createtime',
            key: 'createtime',
            align: 'center',
            render: (text, record) => {
                return utils.dateToString(record.createtime, 'YYYY-MM-DD h:mm:ss')
            }
        },
        {
            title: t('sendDetail_receiveTime'),
            dataIndex: 'receivetime',
            key: 'receivetime',
            align: 'center',
            render: (text, record) => {
                return utils.dateToString(record.receivetime, 'YYYY-MM-DD h:mm:ss')
            }
        },
        {
            title: t('common_operation'),
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <div>
                    <div className="dsClickableRed" onClick={() => {
                        onSendDetail(text, record)
                    }}>{t('common_detail')}
                    </div>
                </div>
            ),
        },
    ];


    function searchBtnClick(data) {
        const time = data.createTime ? new Date(data.createTime) : '';
        const searchFormFmt = Object.assign({}, searchForm, data, {
            createBeginTime: time,
            createEndTime: time,
            // 点击搜索应该从第一页开始
            page: 1,
        });
        setSearchForm(searchFormFmt);
        getTables(searchFormFmt)
    }


    function getTables(params) {
        Api.querySmsItemList(params).then(res => {
            if (res === false) return;
            if (res && Array.isArray(res.entityList)) {
                setPagination(Object.assign({}, initPagination, {
                    total: res.pageInfo.totalCounts,
                    current: res.pageInfo.page,
                    pageSize: res.pageInfo.pagesize,
                }));
                setTableData(res.entityList);
            }
        })
    }

    // 获取短信类型
    function getSendType() {
        Api.querySendType().then(res => {
            if (res === false) return;
            setSmsTypeOptions(res);
            const sendTypeOptions = res.map(item => {
                return {
                    label: item.typeDesc,
                    value: item.typeCode
                }
            });
            const newSearchData = searchBoxData.concat()
            newSearchData[1].options = sendTypeOptions;
            setSearchBoxData(newSearchData)
        })
    }

    async function onSendDetail(text, record) {
        const detail = await Api.getSmsItem({messageId: record.messageId});
        if (detail) {
            setSmsDetail(detail);
            setDetailVisible(true);
        }
    }

    function messageNode(content) {
        return (
            <div>
                <Tooltip title={content} placement="bottom">
                    <div style={{width: '190px'}} className="ds-ellipsis-single">{content}</div>
                </Tooltip>
            </div>
        )
    }

    function onTableChange({current: page, pageSize}) {
        const searchFormFmt = Object.assign({}, searchForm, {
            page, pageSize
        });
        setSearchForm(searchFormFmt);
        getTables(searchFormFmt)
    }

    const DetailModal = (
        <Modal
            okText="确定"
            cancelText="取消"
            title="短信详情"
            maskClosable={false}
            visible={detailVisible}
            onOk={() => {
                setDetailVisible(false);
            }}
            onCancel={() => {
                setDetailVisible(false);
            }}
            initialWidth={600}
            initialHeight={300}
        >
            <Descriptions layout="horizontal" column={1}>
                <Descriptions.Item label="短信类型">{smsDetail.type}</Descriptions.Item>
                <Descriptions.Item label="手机号码">{smsDetail.toNumber}</Descriptions.Item>
                <Descriptions.Item label="短信模板">{smsDetail.templateName}</Descriptions.Item>
                <Descriptions.Item label="短信内容">{smsDetail.message}</Descriptions.Item>
                <Descriptions.Item label="国家" span={4}>{smsDetail.countryName}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );

    function onSearchChange(data) {
        const time = data.createTime ? new Date(data.createTime) : '';
        const searchFormFmt = Object.assign({}, searchForm, data, {
            createBeginTime: time,
            createEndTime: time,
            // 点击搜索应该从第一页开始
            page: 1,
        });
        setSearchForm(searchFormFmt);
        console.log('onSearchChange------')
        console.log(data)
        console.log(searchFormFmt)
    }

    function excelExport() {
        // 遍历对象是不能保证顺序的（虽然很多时候看起来是按顺序，依赖于浏览器规则）
        // 为保证顺序，请不要将key 值设置为为负整数（Chrome Opera 会将数组提前）
        const sheetHeader = {
            index: '序号',
            type: '短信类型',
            toNumber: '手机号',
            templateName: '超信模板',
            message: '短信内容',
            countryName: '国家',
            status: '发送状态',
            isBilling: '是否计费',
            price: '计费金额',
            createtime: '请求时间',
            receivetime: '送达时间',
        };
        const sheetHeaderKey = Object.keys(sheetHeader);
        const sheetHeaderValue = Object.values(sheetHeader);
        Api.smsItemListExport(searchForm).then(res => {
            if (res) {
                // 数据需要翻译
                const exportData = res.map((item, index) => {
                    item.index = index + 1;
                    item.type = utils.typeTranslate(
                        item.type,
                        'typeCode',
                        'typeDesc',
                        smsTypeOptions
                    );
                    item.status = utils.typeTranslate(
                        item.status,
                        'value',
                        'label',
                        sendStatus
                    );

                    item.isBilling = utils.typeTranslate(
                        item.isBilling,
                        'value',
                        'name',
                        [
                            {
                                value: 0,
                                name: '否'
                            },
                            {
                                value: 1,
                                name: '是'
                            }]
                    );
                    item.createtime = utils.dateToString(item.createtime, 'YYYY-MM-DD h:mm:ss')
                    item.receivetime = utils.dateToString(item.receivetime, 'YYYY-MM-DD h:mm:ss')

                    return sheetHeaderKey.map(headerKey => {
                        return item[headerKey]
                    });
                });
                exportData.unshift(sheetHeaderValue);

                DsExcelExport([{
                    name: "发送明细",
                    colsWidth: [
                        {wch: 8},
                        {wch: 20},
                        {wch: 20},
                        {wch: 20},
                        {wch: 50},
                        {wch: 12},
                        {wch: 10},
                        {wch: 10},
                        {wch: 10},
                        {wch: 30},
                        {wch: 30},
                    ],
                    sheet: exportData
                }], '发送明细');
            }
        })
    }

    return (<div className='dsContent' style={{minWidth: '1200px'}}>
        <DsBreadcrumb crumbs={crumbs}/>
        <DsSearchBox searcitems={searchBoxData} dsCallBack={searchBtnClick} onChange={onSearchChange}/>
        <div>
            <div style={{marginBottom: '10px'}}>
                <Button type='danger' onClick={() => {
                    excelExport()
                }}>{t('common_exportTable')}</Button>
            </div>
            <Table onChange={onTableChange} dataSource={tableData} columns={columns} pagination={pagination} bordered/>
            {tableData.length > 0 ? (
                <div style={{
                    position: 'relative',
                    width: '500px',
                    top: '-50px',
                    left: '12px'
                }}>{t('sendDetail_tips')}
                </div>
            ) : null}
        </div>
        {DetailModal}
    </div>)
}

export default SendDetail
