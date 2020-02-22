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

// 获取系统配置
export const getConfig = () => {
  return http.get('/config');
};

// 获取标签列表
export const getTags = () => {
  return http.get('/tags');
};

// 获取项目列表
export const getProjects = (params = {}) => {
  return http.get('/projects', params);
};

// 获取项目详情
export const getProjectInfo = (id = '', params = {}) => {
  return http.get(`/project/${id}`, params);
};

// 获取记录列表
export const getLogs = (pid = '', params = {}) => {
  return http.get(`/project/${pid}/logs`, params);
};

// 获取TODO列表
export const getTODO = (pid = '', params = {}) => {
  return http.get(`/project/${pid}/todo`, params);
};

// 获取清单列表
export const getChecklist = (params = {}) => {
  return http.get('/checklist', params);
};

// 获取清单详情
export const getCheckDetail = (id = '', params = {}) => {
  return http.get(`/checklist/${id}`, params);
};

// 获取条目列表
export const getEntries = (pid = '', params = {}) => {
  return http.get(`/checklist/${pid}/entries`, params);
};

// 获取关于我的信息
export const getAbout = () => {
  return http.get(`/about`);
};

// 获取评论列表
export const getComments = (params = {}) => {
  return http.get(`/comments`, params);
};

// 提交评论
export const submitComment = (params = {}) => {
  return http.post(`/comment`, params);
};
