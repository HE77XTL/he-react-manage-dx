const zh_cn = {
    // 由于要求字段名唯一，就不分多个文件写了；
    // key 命名规范： page_world; 例如： login_title
    // 菜单从后端接口返回的 name  拿到key , 特殊点

    // 菜单------------------
    sendDetail: '发送明细',
    sendStatistic: '发送统计',
    superSmsSend: '超信发送',

    // 登陆------------------
    login_title: '登录短信平台',
    login_userNamePlaceholder: '请输入用户名称',
    login_passwordPlaceholder: '请输入密码',
    login_validCodePlaceholder: '请输入验证码',
    login_loginBtnText: '登录',

    // 首页------
    home_userCredit: '可用额度',
    home_logout: '退出',
    home_logoutConfirm: '确认退出吗？',
    home_logoutSuccess: '退出成功',
    home_confirm: '确定',
    home_cancel: '取消',
    home_modifyPassword: '修改密码',
    home_oldPassword: '原密码',
    home_oldPasswordPlaceholder: '请输入原密码',
    home_newPassword: '新密码',
    home_newPasswordPlaceholder: '请输入新密码',
    home_newPasswordConfirm: '确认新密码',
    home_newPasswordAgain: '再次输入新密码',
    home_editSuccess: '修改成功',

    // 发送统计 -----------------------
    sendStatistic_SMSPlatform: '短信平台',
    sendStatistic_SuccessOfMonth: '当月成功发送数',
    sendStatistic_ConsumptionOfMonth: '当月消耗金额',
    sendStatistic_statisticNote: '注：展示当月数据概况（更新至昨日）',

    // 发送明细 -------------------------
    sendDetail_selectTime: '选择时间',
    sendDetail_smsType: '短信类型',
    sendDetail_toNumber: '短信下发手机号码',
    sendDetail_sendStatus: '发送状态',
    sendDetail_RCSTemplate: '超信模板',
    sendDetail_smsContent: '短信内容',
    sendDetail_isBilling: '是否计费',
    sendDetail_amount: '计费金额',
    sendDetail_requestTime: '请求时间',
    sendDetail_receiveTime: '送达时间',
    sendDetail_smsDetail: '短信详情',
    sendDetail_total: '共{{total}}条数据',
    sendDetail_tips: '注：由于短信数据量较大，默认展示昨日短信数据，并可选择近7天数据进行查询',

    //超信发送 --------------------
    superSmsSend_templateName: '模板名称',
    superSmsSend_RCSTitle: '超信标题',
    superSmsSend_lengthLimit: '限30个数字、英文字符，只做备注使用',
    superSmsSend_contentType: '添加素材',
    superSmsSend_RCSText: '超信文本',
    superSmsSend_RCSImage: '超信图片',
    superSmsSend_uploadText: '上传文本',
    superSmsSend_uploadImage: '上传图片',
    superSmsSend_addRCSContent: '添加超信内容',
    superSmsSend_onlyTxt: '仅支持.txt格式,大小不超过300K',
    superSmsSend_onlyImage: '仅支持.jpg、.jpeg、.PNG格式，大小不超过300K',
    superSmsSend_displayOrder: '展示顺序',
    superSmsSend_receivePhone: '接收号码',
    superSmsSend_phoneNumberInputTips: '可填写多个手机号码（以换行符进行分隔），例如：',
    superSmsSend_templateNameTips: '模板名称不能为空',
    superSmsSend_addContentPlaceHolder: '请添加超信内容',
    superSmsSend_RCSTextNoEmpty: '超信文本不能为空',
    superSmsSend_RCSImageNoEmpty: '超信图片不能为空',
    superSmsSend_RCSImageSizeLimit: '超信图片大小不能超过2M',
    superSmsSend_toNumberNoEmpty: '发送号码不能为空',
    superSmsSend_materialType: '选择类型',
    superSmsSend_materialTips: '素材说明',
    superSmsSend_materialAddBtnText: ' 添加素材',
    superSmsSend_materialUpload: ' 上传素材',



    // 通用-------------------------
    common_reset: '重置',
    common_query: '查询',
    common_exportTable: '导出表格',
    common_serialNumber: '序号',
    common_phoneNumber: '手机号',
    common_pieces: 'pcs',
    common_country: '国家',
    common_operation: '操作',
    common_detail: '详情',
    common_cancel: '取消',
    common_confirm: '确定',
    common_submit: '提交',
    common_submitConfirm: '是否确认提交？',
    common_message: '提示',
    common_sending: '发送中',
    common_success: '成功',
    common_fail: '失败',



    intl_breadcrumb: '国际化产品',
    tips: '通过切换语言按钮，来改变当前内容的语言。',
    btn: '切换英文',
    title1: '常用用法',
    p1: '要是你把你的秘密告诉了风，那就别怪风把它带给树。',
    p2: '没有什么比信念更能支撑我们度过艰难的时光了。',
    p3: '只要能把自己的事做好，并让自己快乐，你就领先于大多数人了。',
    title2: '组件插值',
    info: 'Antd组件需要国际化，请参考 {action}。',
    value: '文档',
    title3: 'Antd组件国际化'
}

export default zh_cn;
