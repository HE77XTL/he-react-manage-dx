import apiConfig from '../api.config';
import request from '../axios';

const {webapi} = apiConfig.getApiRoot();
// verificationCode?_1610421699513

const api = {
    //登录注册-----------------

    verificationCode: p => request.get(webapi + '/verificationCode', p),// 验证码
    login: p => request.post(webapi + '/login', p),// 登陆
    logout: p => request.post(webapi + '/logout', p),// 退出



    queryAllProductName: p => request.post(webapi + '/incomeBillListInfo/queryAllProductName', p),




    // getDynamicSecretKey: p => request.get(webapi + '/webapi/getDynamicSecretKey', p),//获取动态密钥
    // login: p => request.post(webapi + '/webapi/login', p),//手机账号密码登录
    // loginWx: p => request.post(webapi + '/webapi/loginWx', p),//微信code登录
    // modPassword: p => request.post(webapi + '/webapi/modPassword', p),//修改密码
    // register: p => request.post(webapi + '/webapi/register', p),//注册
    // getUserInfo: p => request.get(webapi + '/webapi/getUserInfo/', p),//获取用户信息
};

export default api;
