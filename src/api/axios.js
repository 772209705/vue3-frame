import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { baseUrl } from './config';
import store from '../store/index';

// 创建axios实例
const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(async (config) => {
  const token = store.getters.getToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 响应拦截器
service.interceptors.response.use(
  async (response) => {
    const { code, message, data } = response.data;
    console.log("响应数据："+data);
    if (code !== 200) {
      handleError(code, message);
      return Promise.reject(new Error(message));
    }
    return data;
  },
  async (error) => {
    handleError(error.response, error.message);
    return Promise.reject(error);
  }
);

// 错误处理函数
function handleError(code, message) {
  console.log("错误拦截=>："+message);
  ElMessage.error(message);
  if (code === 5001 || code === 5002 || code === 5004) {
    ElMessageBox.confirm(
      '你已被登出，可以取消继续留在该页面，或者重新登录',
      '确定登出',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload();
      });
    });
  }
}

export default {
  install: (app, options) => {
    app.config.globalProperties.$http = service;
  }
}