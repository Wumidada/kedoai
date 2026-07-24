import axios from 'axios';
import { message } from 'ant-design-vue';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: true
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('TOKEN');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    message.error('请求发送失败');
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.statusCode === 200 || data.statusCode === 0) {
      return data;
    } else {
      message.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || '请求失败'));
    }
  },
  (error) => {
    let errorMessage = '请求失败';
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          errorMessage = '登录已过期，请重新登录';
          localStorage.removeItem('TOKEN');
          localStorage.removeItem('REFRESH_TOKEN');
          window.location.href = '/login';
          break;
        case 403:
          errorMessage = '拒绝访问';
          break;
        case 500:
          errorMessage = '服务器错误';
          break;
        default:
          errorMessage = `连接错误${status}`;
      }
    } else if (error.request) {
      errorMessage = '网络错误，请检查您的网络连接';
    }
    message.error(errorMessage);
    return Promise.reject(error);
  }
);

export default service;