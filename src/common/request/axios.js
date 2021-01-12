// 所有的请求错误都统一处理了
// 使用时只需要关注 成功的res


import axios from 'axios';
import qs from 'qs';

import {Message} from 'caihrc';


const pending = new Map();
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&');
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
            pending.set(url, cancel);
        }
    });
};
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&');
    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url);
        cancel(url);
        pending.delete(url);
    }
};
/**
 * 清空 pending 中的请求（在路由跳转或登录失效时调用）
 */
export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url);
    }
    pending.clear();
};

//设置全局默认的请求头
axios.defaults.headers.token = localStorage.getItem('token');

//请求拦截
axios.interceptors.request.use(
    config => {
        removePending(config); // 在请求开始前，对之前的请求做检查取消操作
        addPending(config);// 将当前请求添加到 pending 中
        axios.defaults.headers.token = localStorage.getItem('token');
        return config;
    },
    error => {
        Message.error('请求超时！');
        return Promise.reject(error);
    }
);

//响应拦截----
axios.interceptors.response.use(response => {
        removePending(response.config); // 在请求结束后，移除本次请求
        if (response.status === 200) {
            if (response.data.retCode === '403') {
                //登录失效，取消所有请求,
                // 如果不取消，某些页面初始化发送多个请求，下列语句会执行多次
                clearPending();
                Message.error(response.data.message);
                // store.commit('isLoginUpdate', false);
                // router.push('/login');
                return false;
            } else if (response.data.retCode !== '00000') {
                Message.error(response.data.message);
                return false;
            }
        }
        return response.data.data;
    },
    error => {
        //注意，这里也是 resolve!!
        // 使用的时候不再关注catch
        if (axios.isCancel(error)) {
            error.message = 'cancel';
            return Promise.resolve(error);
        }
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
            //退出登录
            clearPending();
            window.localStorage.clear();
            // router.push('/login');
        }
        Message.error(error.message)
        return Promise.resolve(error);
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
