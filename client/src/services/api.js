import * as http from './http';
import * as CryptoJS from 'crypto-js';

export const baseURL = http.baseURL;

// 登录
export const login = (params = {}) => {
  params.password = passwordDigest(params.password, params.username);
  return http.post('/login', params);
};

// 注册用户
export const register = (params = {}) => {
  params.password = passwordDigest(params.password, params.username);
  return http.post('/register', params);
};

const passwordDigest = (password, username) => {
  return CryptoJS.HmacSHA1(password, CryptoJS.SHA1(username)).toString();
};

// 获取标签列表
export const getTags = () => {
  return http.get('/tags');
};

// 获取项目列表
export const getProjects = () => {
  return http.get('/projects');
};

// 获取项目详情
export const getProjectInfo = (id = '', params = {}) => {
  return http.get(`/project/${id}`, params);
};

// 获取记录列表
export const getLogs = (pid = '') => {
  return http.get(`/project/${pid}/logs`);
};

// 获取TODO列表
export const getTODO = (pid = '') => {
  return http.get(`/project/${pid}/todo`);
};
