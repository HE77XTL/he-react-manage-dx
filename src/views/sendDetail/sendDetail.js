import React, {useState, useEffect} from 'react'
import {Table, Button, Modal, Descriptions, Tooltip} from 'caihrc'
import {useHistory} from "react-router-dom";

import DsBreadcrumb from '../../components/dsBreadcrumb/dsBreadcrumb'
import DsSearchBox from '../../components/dsSearchBox/dsSearchBox'
import Api from "../../common/request/api/api";
import store from "store";
import utils from '../../common/utils/utils'

import DsExcelExport from '../../common/utils/dsExcelExport'

const SendDetail = function () {
    const history = useHistory();
    const user = store.get('user');
    if (!user) {
        history.push('/login');
    }
    const [detailVisible, setDetailVisible] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [searchForm, setSearchForm] = useState({
        page: 1,
        pageSize: 10,
    });

    const searchItems = [
        {
            key: 'createTime',
            type: 'date',
            name: '选择时间',
            searchValue: '',
            placeholder: '请选择',
        },
        {
            key: 'type',
            type: 'select',
            name: '短信类型',
            searchValue: '',
            options: [],
            placeholder: '请选择',
        },
        {
            key: 'toNumber',
            type: 'number',
            name: '短信下发手机号码',
            searchValue: '',
            placeholder: '请输入手机号码',
        },
        {

            key: 'status',
            type: 'select',
            name: '发送状态',
            searchValue: "",
            options: [
                {"label": "发送中", "value": 99001},
                {"label": "成功", "value": 99002},
                {"label": "失败", "value": 99003}],
            placeholder: '请选择',
        },

    ];
    const [searchBoxData, setSearchBoxData] = useState(searchItems);

    const [smsTypeOptions, setSmsTypeOptions] = useState([]);

    const [total, setTotal] = useState(21);

    useEffect(() => {
        initData();
    }, []);

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
            name: '发送明细',
            url: ''
        },
    ];


    const columns = [
        {
            title: '序号',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            align: 'center',
            render(text, record, index) {
                return index
            }
        },
        {
            title: '短信类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center',
            render: (text, record) => {
                return utils.typeTranslate(record.type, 'typeCode', 'typeDesc', smsTypeOptions)
            }
        },
        {
            title: '手机号',
            dataIndex: 'toNumber',
            key: 'toNumber',
            align: 'center',
        },
        {
            title: '短信内容',
            dataIndex: 'message',
            key: 'message',
            align: 'center',
            width: 200,
            render: (text, record) => {
                return messageNode(record.message)
            }
        },
        {
            title: '国家',
            dataIndex: 'countryName',
            key: 'countryName',
            align: 'center',
        },
        {
            title: '发送状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: '是否计费',
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
            title: '计费金额',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: '请求时间',
            dataIndex: 'createtime',
            key: 'createtime',
            align: 'center',
            render: (text, record) => {
                return utils.dateToString(record.createtime, 'YYYY-MM-DD h:mm:ss')
            }
        },
        {
            title: '送达时间',
            dataIndex: 'receivetime',
            key: 'receivetime',
            align: 'center',
            render: (text, record) => {
                return utils.dateToString(record.receivetime, 'YYYY-MM-DD h:mm:ss')
            }
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => (
                <div>
                    <div className="dsClickableRed" onClick={() => {
                        sendDetail(text, record)
                    }}>详情
                    </div>
                </div>
            ),
        },
    ];
    const pagination = {
        defaultPageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
        total: total,
        showTotal: (total) => {
            return '共' + total + '条数据';
        },
    };


    function searchBtnClick(data) {
        const time = data.createTime ? new Date(data.createTime) : '';
        const searchFormFmt = Object.assign({}, searchForm, data, {
            createBeginTime: time,
            createEndTime: time,
            page: 1,
            pageSize: 10
        })
        setSearchForm(searchFormFmt);

        console.log('searchForm4444')
        console.log(searchFormFmt)
        getTables(searchFormFmt)
    }


    function getTables(params) {
        Api.querySmsItemList(params).then(res => {
            console.log('table list----')
            console.log(res)
            if (res === false) return;
            if (res && Array.isArray(res.entityList)) {
                setTotal(res.pageInfo.totalCounts)
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


    function sendDetail(text, record) {
        getSmsDetail(record.messageId);
        setDetailVisible(true);
    }

    function getSmsDetail(messageId) {
        //messageId = '1334330261523607552'
        Api.getSmsItem({messageId}).then(res => {
            console.log('getSmsDetail')
            console.log(res)
        })
    }

    let data = {
        userName: '王小二',
        tel: '18677778888',
        live: '广西壮族自治区',
        remark: '-',
        address: '广西壮族自治区南宁市良庆区道18号中国东信'
    };


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
        console.log(searchFormFmt)

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
                <Descriptions.Item label="短信类型">{data.userName}</Descriptions.Item>
                <Descriptions.Item label="手机号码">{data.tel}</Descriptions.Item>
                <Descriptions.Item label="短信模板">{data.live}</Descriptions.Item>
                <Descriptions.Item label="短信内容">{data.address}</Descriptions.Item>
                <Descriptions.Item label="国家" span={4}>{data.remark}</Descriptions.Item>
            </Descriptions>
        </Modal>
    );


    function excelExport(jsonData) {
        const xxx = [
            {
                name: '部门统计',
                sheet: [{department: "行政部", count: 2}, {department: "前端部", count: 2}]
            },
            {
                name: '第二张sheet名字',
                sheet: [{name: "张三", do: "整理文件"}, {name: "李四", do: "打印"}]
            }
        ];

        DsExcelExport(xxx, '表格1');
    }

    return (<div className='dsContent' style={{minWidth: '1200px'}}>
        <DsBreadcrumb crumbs={crumbs}/>
        <DsSearchBox searcitems={searchBoxData} dsCallBack={searchBtnClick}/>
        <div>
            <div style={{marginBottom: '10px'}}>
                <Button type='danger' onClick={() => {
                    excelExport()
                }}>导出</Button>
            </div>
            <Table onChange={onTableChange} dataSource={tableData} columns={columns} pagination={pagination} bordered/>
            <div style={{
                position: 'relative',
                top: '-50px'
            }}>注：由于短信数据量较大，默认展示昨日短信数据，并可选择近7天数据进行查询
            </div>
        </div>
        {DetailModal}
    </div>)
}

export default SendDetail
