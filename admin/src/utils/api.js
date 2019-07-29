import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

export const baseURL = axios.defaults.baseURL

// 获取图片列表
export const getImgList = ((params = {}) => {
    return axios.get("/getImgList", {
        params
    })
})

// 上传图片
export const uploadImg = ((params = {}) => {
    return axios.post("/uploadImg", params)
})

// 修改图片
export const updatedImg = ((params = {}) => {
    return axios.post("/updatedImg", params)
})

// 删除图片
export const deleteImg = ((params = {}) => {
    return axios.delete("/deleteImg", {
        params
    })
})

// 获取标签列表
export const getTags = ((params = {}) => {
    return axios.get("/getTags", {
        params
    })
})

// 修改标签
export const addTags = ((params = {}) => {
    return axios.post("/addTags", params)
})

// 删除标签
export const deleteTag = ((params = {}) => {
    return axios.delete("/deleteTag", {
        params
    })
})

// 获取项目列表
export const getProjectList = ((params = {}) => {
    return axios.get("/getList", {
        params
    })
})

// 获取项目详情
export const getProjectInfo = ((params = {}) => {
    return axios.get("/getInfo", {
        params
    })
})

// 修改项目
export const updatedProject = ((params = {}) => {
    return axios.post("/updatedProject", params)
})

// 删除项目
export const deleteProject = ((params = {}) => {
    return axios.delete("/deleteProject", {
        params
    })
})

// 获取记录列表
export const getLogs = ((params = {}) => {
    return axios.get("/getLogs", {
        params
    })
})

// 更新记录
export const updatedLog = ((params = {}) => {
    return axios.post("/updatedLog", params)
})

// 删除记录
export const deleteLog = ((params = {}) => {
    return axios.delete("/deleteLog", {
        params
    })
})

