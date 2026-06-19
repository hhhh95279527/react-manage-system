import axios from 'axios';
import { message } from 'antd';

const api = import.meta.env.VITE_BASE_URL; // /api
const instance = axios.create({
    baseURL: api,
    timeout: 3000,
    timeoutErrorMessage: '请求超时，请刷新页面重新尝试',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest',
    },
});

instance.interceptors.request.use(
    (config) => {
        // todo: 请求拦截器
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (response) => {
        const data = response.data;
        if (data.code === 40001) {
            window.location.href = '/login';
        } else if (data.code !== 200) {
            message.error(data.msg);
        }
        return data.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default {
    get<T>(url: string, params?: object): Promise<T> {
        return instance.get(url, { params });
    },
    post<T>(url: string, params?: object): Promise<T> {
        return instance.post(url, params);
    },
    put<T>(url: string, params?: object): Promise<T> {
        return instance.put(url, params);
    },
    delete<T>(url: string, params?: object): Promise<T> {
        return instance.delete(url, { params });
    },
};
