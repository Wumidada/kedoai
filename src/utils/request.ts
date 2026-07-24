import axios, { AxiosResponse, AxiosError } from 'axios';
import { message } from 'ant-design-vue';
import {useStorage} from '@/hooks/useStorage'
import { forceLogout } from './auth'

const {getToken} = useStorage()

// 处理token过期
const handleTokenExpired = () => {
  forceLogout();
};
// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, // 从环境变量获取基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  withCredentials: false // 临时关闭，避免CORS问题
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    // 对请求错误做些什么
    message.error('请求发送失败');
    return Promise.reject(error);
  }
);

// 请求缓存机制
const requestCache: Record<string, Promise<any>> = {};

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    // 移除控制台日志，提高性能
    
    // 这里可以根据后端的数据结构进行调整
    if (data.statusCode === 200 || data.statusCode === 0) {
      return data;
    } else {
      message.error(data.message || '请求失败');
      return Promise.reject(new Error(data.message || '请求失败'));
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 状态码错误
    let errorMessage = '请求失败';
    // 移除控制台日志，提高性能
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          errorMessage = '登录已过期，请重新登录';
          // 清除token和用户信息
          handleTokenExpired();
          break;
        case 403:
          errorMessage = '拒绝访问';
          break;
        case 404:
          errorMessage = '请求错误，未找到该资源';
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

// 带缓存的请求方法
export const cachedRequest = (url: string, config?: any) => {
  const cacheKey = `${url}_${JSON.stringify(config || {})}`;
  
  if (requestCache[cacheKey]) {
    return requestCache[cacheKey];
  }
  
  requestCache[cacheKey] = service({ url, ...config })
    .finally(() => {
      // 请求完成后移除缓存，避免数据过期
      setTimeout(() => {
        delete requestCache[cacheKey];
      }, 5000); // 5秒后过期
    });
  
  return requestCache[cacheKey];
};

export default service; 