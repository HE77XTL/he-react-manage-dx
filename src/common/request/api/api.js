import apiConfig from '../api.config';
import request from '../axios';

const {webapi, webapish} = apiConfig.getApiRoot();
// verificationCode?_1610421699513

const api = {
    //登录注册-----------------
    verificationCode: p => request.get(webapi + '/verificationCode', p),// 验证码
    login: p => request.post(webapi + '/login', p),// 登陆
    logout: p => request.post(webapi + '/logout', p),// 退出
    modifyPassword: p => request.post(webapi + '/user/modifyPassword', p),// 修改登陆密码

    querySmsItemList: p => request.post(webapi + '/portal/querySmsItemList', p),// 发送详情列表
    smsItemListExport: p => request.post(webapi + '/portal/getSmsItemList', p),// Excel获取数据接口


    getSmsItem: p => request.post(webapi + '/portal/getSmsItem', p),// 获取短信详情

    querySendType: p => request.post(webapi + '/portal/querySendType', p),// 获取短信类型


    sendSuperSMS: p => request.upload(webapish + '/portal/sendSuperSMS', p),// 发送超级短信任务


};

export default api;
