import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

export const baseURL = axios.defaults.baseURL;

// 获取-项目列表
export const getList = (params = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return axios.get(
      'https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data/json/list.json',
      {
        params,
      }
    );
  } else {
    return axios.get('/getList', {
      params,
    });
  }
};

// 获取-项目记录列表
export const getLogs = (params = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return axios.get(
      `https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data/json/${params.id}.json`,
      {
        params,
      }
    );
  } else {
    return axios.get('/getLogs', {
      params,
    });
  }
};

// 获取-标签列表
export const getTags = (params = {}) => {
  if (process.env.NODE_ENV === 'production') {
    return axios.get(
      `https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data/json/tags.json`,
      {
        params,
      }
    );
  } else {
    return axios.get('/getTags', {
      params,
    });
  }
};
