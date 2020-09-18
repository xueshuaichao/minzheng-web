import Axios from 'axios';
import { Message } from 'view-design';
// import storage from '@libs/storage';
import URL from '../config/url';
import CONF from '../config';
import { contractUrl } from './utils';

const { STATUS_CODE } = CONF;
const NO_MESSAGE = [STATUS_CODE.NO_LOGIN, STATUS_CODE.NO_SELECT_SHOP];
const baseURL = URL.API;
const METHOD = {
    POST: 'post',
    GET: 'get',
};

// 请求拦截
const interceptors = (instance) => {
    instance.interceptors.request.use(
        config => config,
        error => Promise.reject(error),
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
        (res) => {
            const { data } = res;
            if (!(data instanceof Blob)) {
                if (data.code !== STATUS_CODE.SUCCESS) {
                    if (data.message && !NO_MESSAGE.includes(data.code)) {
                        Message.error({
                            content: data.message,
                            duration: 3,
                        });
                    }
                    return Promise.reject(data);
                }
            }
            return data;
        },
        (error) => {
            // 对响应错误做点什么
            Message.error('服务器开小差啦');
            return Promise.reject(error);
        },
    );
};

// 创建实例
const create = () => {
    const conf = {
        baseURL,
        timeout: 0,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            // token: storage.getToken(),
        },
        crossDomain: true,
        withCredentials: false,
    };
    return Axios.create(conf);
};

export class HttpRequest {
    constructor() {
        // 存储请求队列
        this.queue = {};
    }

    // 销毁请求实例
    destroy(url) {
        delete this.queue[url];
        const queue = Object.keys(this.queue);
        return queue.length;
    }

    // request
    request(url, params = {}) {
        const data = JSON.parse(JSON.stringify(params));
        if (Object.prototype.hasOwnProperty.call(data, 'queryString')) {
            // eslint-disable-next-line no-param-reassign
            url = contractUrl(url, data.queryString);
            // eslint-disable-next-line no-param-reassign
            delete data.queryString;
        }
        return this.post(url, data);
    }

    get(url, params) {
        const instance = create();
        const newOptions = { url, method: METHOD.GET, params };
        interceptors(instance, newOptions.url);
        this.queue[newOptions.url] = instance;
        return instance(newOptions);
    }

    post(url, params) {
        const data = params && JSON.parse(JSON.stringify(params));
        const instance = create();
        if (data) {
            Object.keys(data).forEach(
                key => data[key] !== 0 && !data[key] && delete data[key],
            );
        }

        const options = { url, data, method: METHOD.POST };
        interceptors(instance, options.url);
        this.queue[options.url] = instance;
        return instance(options);
    }

    file(url, params) {
        const formData = new FormData();
        const instance = create();
        Object.keys(params).forEach((v) => {
            formData.append(v, params[v]);
        });
        const options = {
            url,
            data: formData,
            method: METHOD.POST,
        };
        interceptors(instance, options.url);
        this.queue[options.url] = instance;
        return instance(options);
    }
}

export const axios = new HttpRequest();
