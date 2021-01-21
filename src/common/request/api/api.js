import apiConfig from '../api.config';
import request from '../axios';

const {webapi} = apiConfig.getApiRoot();
// verificationCode?_1610421699513

const api = {
    //登录注册-----------------

    verificationCode: p => request.get(webapi + '/verificationCode', p),// 验证码
    login: p => request.post(webapi + '/login', p),// 登陆
    logout: p => request.post(webapi + '/logout', p),// 退出
    modifyPassword: p => request.post(webapi + '/user/modifyPassword', p),// 修改登陆密码





    queryAllProductName: p => request.post(webapi + '/incomeBillListInfo/queryAllProductName', p),
    querySmsItemList: p => request.post(webapi + '/operation/querySmsItemList', p),


};

export default api;
