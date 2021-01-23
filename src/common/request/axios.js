// 所有的请求错误都统一处理了
// 使用时只需要关注 成功的res

import axios from 'axios';
import qs from 'qs';
import store from 'store'
import {HashRouter} from 'react-router-dom'
import {Message} from 'caihrc';


//设置全局默认的请求头
axios.defaults.headers.token = store.get('token');

//请求拦截
axios.interceptors.request.use(
    config => {
        config.headers.token = store.get('token');
        return config;
    },
    error => {
        Message.error('请求超时！');
        return Promise.reject(error);
    }
);

//响应拦截----
axios.interceptors.response.use(response => {
        const router = new HashRouter();
        console.log('response响应拦截----')
        console.log(response)
        console.log('response响应拦截----')
        if (response.status === 200) {
            if (response.data.retCode === '403') {
                Message.error(response.data.message);
                store.clearAll();
                router.history.push('/login');
                return false;
            } else if (response.data.retCode !== '00000') {
                Message.error(response.data.message);
                return false;
            }
        }
        return response.data.data;
    },
    error => {
        const router = new HashRouter();
        //注意，这里也是 resolve!!
        // 使用的时候不再关注catch
        // 放心的 用 await 吧
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误(400)';
                    break;
                case 401:
                    error.message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    error.message = '拒绝访问(403)';
                    break;
                case 404:
                    error.message = '请求出错(404)';
                    break;
                case 408:
                    error.message = '请求超时(408)';
                    break;
                case 500:
                    error.message = '服务器错误(500)';
                    break;
                case 501:
                    error.message = '服务未实现(501)';
                    break;
                case 502:
                    error.message = '网络错误(502)';
                    break;
                case 503:
                    error.message = '服务不可用(503)';
                    break;
                case 504:
                    error.message = '网络超时(504)';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    error.message = `连接出错(${error.response.status})！`;
            }
        } else {
            error.message = '连接服务器失败！';
            window.localStorage.clear();
            router.history.push('/login');
        }
        Message.error(error.message);
        return Promise.resolve(false);
    }
);

const request = {
    get(url, params) {
        const pkT = new Date().getTime();
        const reqUrl = params ? `${url}${params}?t=${pkT}` : `${url}?t=${pkT}`;
        return axios({
            method: 'get',
            url: reqUrl,
        });
    },
    post(url, params) {
        return axios({
            method: 'post',
            url: url,
            data: params
        });
    },
    postForm(url, params) {
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(params, {arrayFormat: 'repeat'}),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    delete(url, params) {
        const reqUrl = params ? `${url}${params}` : url;
        return axios({
            method: 'delete',
            url: reqUrl
        });
    },
    upload(url, params) {
        return axios({
            method: 'post',
            url: url,
            data: qs.stringify(params),
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },


    exportPost: function (url, params) {
        return axios({
            method: 'post',
            url: url,
            data: params,
            responseType: 'blob'
        });
    },
};

export default request;
