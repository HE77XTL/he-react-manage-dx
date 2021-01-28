const en = {
    // 由于要求字段名唯一，就不分多个文件写了；
    // key 命名规范： page_world; 例如： login_title
    // 菜单从后端接口返回的 name  拿到key , 特殊点

    // 菜单------------------
    sendDetail: 'Send detail',
    sendStatistic: 'Send data',
    superSmsSend: 'Send RCS',

    // 登陆------------------
    login_title: 'Login SMS platform',
    login_userNamePlaceholder: 'Please enter username',
    login_passwordPlaceholder: 'Please enter password',
    login_validCodePlaceholder: 'Please enter verify code',
    login_loginBtnText: 'Login',

    // 首页------
    home_userCredit: 'Available credit',
    home_logout: 'Logout',
    home_logoutConfirm: 'Are you sure to logout?',
    home_logoutSuccess: 'Logout Success',
    home_confirm: 'Confirm',
    home_cancel: 'Cancel',
    home_modifyPassword: 'Change password',
    home_oldPassword: 'Original password',
    home_oldPasswordPlaceholder: 'Please enter the original password',
    home_newPassword: 'New password',
    home_newPasswordPlaceholder: 'Please enter the new password',
    home_newPasswordConfirm: 'Confirm password',
    home_newPasswordAgain: 'Enter the new password again',
    home_editSuccess: 'Change Success',

    // 发送统计 -----------------------
    sendStatistic_SMSPlatform: 'SMS platform',
    sendStatistic_SuccessOfMonth: 'Successfully sent for this month',
    sendStatistic_ConsumptionOfMonth: 'This month consumption credit',
    sendStatistic_statisticNote: 'Note: data show this month profiles (updated to yesterday)',

    // 发送明细 -------------------------
    sendDetail_selectTime: 'Select time',
    sendDetail_smsType: 'SMS type',
    sendDetail_toNumber: 'Phone number',
    sendDetail_sendStatus: 'Sendi state',
    sendDetail_RCSTemplate: 'RCS template',
    sendDetail_smsContent: 'Content of SMS',
    sendDetail_isBilling: 'Charged or not',
    sendDetail_amount: 'Amount',
    sendDetail_requestTime: 'Request time',
    sendDetail_receiveTime: 'Delivery time',
    sendDetail_smsDetail: 'SMS details',
    sendDetail_total: '{{total}} items in total',
    sendDetail_tips: 'Note: Due to the large amount of SMS data, SMS data of yesterday is displayed by default, and only data of recent 7 days can be selected for query',

    //超信发送 --------------------
    superSmsSend_templateName: 'Template name',
    superSmsSend_RCSTitle: 'RCS title',
    superSmsSend_lengthLimit: 'Limited to 30 digits or characters, only for remarks',
    superSmsSend_contentType: 'Add material',
    superSmsSend_RCSText: 'RCS text',
    superSmsSend_RCSImage: 'RCS image',
    superSmsSend_uploadText: 'Upload text',
    superSmsSend_uploadImage: 'Upload image',
    superSmsSend_addRCSContent: 'Add RCS content',
    superSmsSend_onlyTxt: 'Only support. TXT format, size not exceeding 300K',
    superSmsSend_onlyImage: 'Only support jpg,jpeg,png format, size not exceeding 300K',
    superSmsSend_displayOrder: 'Display order',
    superSmsSend_receivePhone: 'Receiving number',
    superSmsSend_phoneNumberInputTips: 'Multiple phone numbers (separated by a newline character) can be entered, for example',
    superSmsSend_templateNameTips: 'Template names cannot be empty',
    superSmsSend_addContentPlaceHolder: 'Please add the RCS content',
    superSmsSend_RCSTextNoEmpty: 'RCS text cannot be empty',
    superSmsSend_RCSImageNoEmpty: 'RCS image cannot be empty',
    superSmsSend_RCSImageSizeLimit: 'Image size can\'t more than 2M',
    superSmsSend_toNumberNoEmpty: 'Receiving number cannot be empty',
    superSmsSend_materialType: 'Select type',
    superSmsSend_materialTips: 'Tips',
    superSmsSend_materialAddBtnText: ' Add RCS content',
    superSmsSend_materialUpload: ' Upload material',

    // 通用-------------------------
    common_reset: 'Reset',
    common_query: 'Query',
    common_exportTable: 'Export table',
    common_serialNumber: 'No.',
    common_phoneNumber: 'Phone number',
    common_pieces: 'pcs',
    common_country: 'Country',
    common_operation: 'Operation',
    common_detail: 'Details',
    common_cancel: 'Cancel',
    common_confirm: 'Confirm',
    common_submit: 'Submit',
    common_submitConfirm: 'Confirm submission?',
    common_message: 'Message',


    intl_breadcrumb: 'International Products',
    breadcrumb: 'International Products',
    tips: 'Click on the button to change the current language. ',
    btn: 'Switch Chinese',
    title1: 'Common usage',
    p1: "If you reveal your secrets to the wind you should not blame the wind for  revealing them to the trees.",
    p2: "Nothing can help us endure dark times better than our faith. ",
    p3: "If you can do what you do best and be happy, you're further along in life  than most people.",
    title2: 'Component interpolation',
    info: 'The default language of Element is Chinese. If you wish to use another language, please refer to the {action}.',
    value: 'documentation',
    title3: 'Internationalization of Antd'
}

export default en;
