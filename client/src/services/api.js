import axios from 'axios';

if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.VUE_APP_API_HOST_PROD;
} else {
  axios.defaults.baseURL = process.env.VUE_APP_API_HOST_DEV;
}

export const baseURL = axios.defaults.baseURL;

// 获取-项目列表
export const getList = (params = {}) => {
  return axios.get('/getList', {
    params,
  });
};

// 获取-项目记录列表
export const getLogs = (params = {}) => {
  return axios.get('/getLogs', {
    params,
  });
};

// 获取-标签列表
export const getTags = (params = {}) => {
  return axios.get('/getTags', {
    params,
  });
};
