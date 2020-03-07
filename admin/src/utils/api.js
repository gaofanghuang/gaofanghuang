import * as http from './http';
import * as CryptoJS from 'crypto-js';

export const baseURL = http.baseURL;

// 登录后台
export const login = (params = {}) => {
  params.password = passwordDigest(params.password, params.username);
  return http.post('/login', params);
};

// 注册用户
export const register = (params = {}) => {
  params.password = passwordDigest(params.password, params.username);
  return http.post('/register', params);
};

// 初始化系统
export const initConfig = (params = {}) => {
  params.password = passwordDigest(params.password, params.username);
  return http.post('/config/init', params);
};

// 密码加密
const passwordDigest = (password, username) => {
  return CryptoJS.HmacSHA1(password, CryptoJS.SHA1(username)).toString();
};

// 获取系统配置
export const getConfig = () => {
  return http.get('/config');
};

// 获取用户列表
export const getUsers = (params = {}) => {
  return http.get('/users', params);
};

// 新增用户
export const addUser = (params = {}) => {
  params.password = passwordDigest(params.password, params.username);
  return http.post(`/user`, params);
};

// 修改用户信息
export const updatedUser = (id = '', params = {}) => {
  return http.updated(`/user/${id}`, params);
};

// 修改用户角色/密码
export const updatedUserRolePW = (id = '', username, params = {}) => {
  params.password = params.password ? passwordDigest(params.password, username) : '';
  return http.updated(`/user/${id}/role`, params);
};

// 删除用户
export const deleteUser = (id = '') => {
  return http.remove(`/user/${id}`);
};

// 获取图片列表
export const getImgs = (params = {}) => {
  return http.get('/images', params);
};

// 上传图片
export const uploadImg = (params = {}) => {
  return http.post(`/image`, params);
};

// 修改图片
export const updatedImg = (id = '', params = {}) => {
  return http.updated(`/image/${id}`, params);
};

// 删除图片
export const deleteImg = (id = '') => {
  return http.remove(`/image/${id}`);
};

// 获取标签列表
export const getTags = (params = {}) => {
  return http.get('/tags', params);
};

// 新增标签
export const addTag = (params = {}) => {
  return http.post('tag', params);
};

// 修改标签
export const updatedTag = (id = '', params = {}) => {
  return http.updated(`/tag/${id}`, params);
};

// 删除标签
export const deleteTag = (id = '') => {
  return http.remove(`/tag/${id}`);
};

// 获取项目列表
export const getProjects = (params = {}) => {
  return http.get('/projects', params);
};

// 获取项目详情
export const getProjectInfo = (id = '', params = {}) => {
  return http.get(`/project/${id}`, params);
};

// 增加项目
export const addProject = (params = {}) => {
  return http.post('/project', params);
};

// 修改项目
export const updatedProject = (id = '', params = {}) => {
  return http.updated(`/project/${id}`, params);
};

// 删除项目
export const deleteProject = (id = '') => {
  return http.remove(`/project/${id}`);
};

// 获取记录列表
export const getLogs = (pid = '', params = {}) => {
  return http.get(`/project/${pid}/logs`, params);
};

// 增加记录
export const addLog = (pid = '', params = {}) => {
  return http.post(`/project/${pid}/log`, params);
};

// 更新记录
export const updatedLog = (pid = '', id = '', params = {}) => {
  return http.updated(`/project/${pid}/log/${id}`, params);
};

// 删除记录
export const deleteLog = (pid = '', id = '') => {
  return http.remove(`/project/${pid}/log/${id}`);
};

// 获取TODO列表
export const getTODO = (pid = '', params = {}) => {
  return http.get(`/project/${pid}/todo`, params);
};

// 增加TODO
export const addTODO = (pid = '', params = {}) => {
  return http.post(`/project/${pid}/todo`, params);
};

// 更新TODO
export const updatedTODO = (pid = '', id = '', params = {}) => {
  return http.updated(`/project/${pid}/todo/${id}`, params);
};

// 删除TODO
export const deleteTODO = (pid = '', id = '') => {
  return http.remove(`/project/${pid}/todo/${id}`);
};

// 更新系统设置
export const updatedConfig = (params = {}) => {
  return http.updated(`/config`, params);
};

// 获取关于我的信息
export const getAbout = () => {
  return http.get(`/about`);
};

// 更新关于我的信息
export const updatedAbout = (params = {}) => {
  return http.updated(`/about`, params);
};

// 获取清单列表
export const getChecklist = (params = {}) => {
  return http.get('/checklist', params);
};

// 获取清单详情
export const getCheckDetail = (id = '', params = {}) => {
  return http.get(`/checklist/${id}`, params);
};

// 增加清单
export const addChecklist = (params = {}) => {
  return http.post('/checklist', params);
};

// 修改清单
export const updatedChecklist = (id = '', params = {}) => {
  return http.updated(`/checklist/${id}`, params);
};

// 删除清单
export const deleteChecklist = (id = '') => {
  return http.remove(`/checklist/${id}`);
};

// 获取条目列表
export const getEntries = (pid = '', params = {}) => {
  return http.get(`/checklist/${pid}/entries`, params);
};

// 增加条目
export const addEntry = (pid = '', params = {}) => {
  return http.post(`/checklist/${pid}/entry`, params);
};

// 更新条目
export const updatedEntry = (pid = '', id = '', params = {}) => {
  return http.updated(`/checklist/${pid}/entry/${id}`, params);
};

// 删除条目
export const deleteEntry = (pid = '', id = '') => {
  return http.remove(`/checklist/${pid}/entry/${id}`);
};

// 获取评论列表
export const getComments = (params = {}) => {
  return http.get(`/comments`, params);
};

// 删除评论
export const deleteComment = (id = '') => {
  return http.remove(`/comment/${id}`);
};

// 回复评论
export const replyComment = (id = '', params = {}) => {
  return http.updated(`/comment/${id}`, params);
};

// 获取音乐列表
export const getMusic = (params = {}) => {
  return http.get(`/music`, params);
};

// 删除音乐
export const deleteMusic = (id = '') => {
  return http.remove(`/music/${id}`);
};

// 添加音乐
export const addMusic = (params = {}) => {
  return http.post(`/music`, params);
};
