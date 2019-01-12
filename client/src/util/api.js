import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

export const baseURL = baseURL;

// 获取-文章列表
export const getList = ((params = {}) => {
    if (process.env.NODE_ENV === "production") {
        return axios.get("https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data/list.json", {
            params
        })
    } else {
        return axios.get("/list", {
            params
        })
    }
})

// 获取-文章
export const getInfo = ((params = {}) => {
    if (process.env.NODE_ENV === "production") {
        return axios.get(`https://raw.githubusercontent.com/gaofanghuang/gaofanghuang/master/serve/data/${params.id}.json`, {
            params
        })
    } else {
        return axios.get("/info", {
            params
        })
    }
})

// 保存-文章
export const saveItem = ((params = {}) => {
    return axios.post("/save", params)
})

// 删除-文章
export const deleteItem = ((params = {}) => {
    return axios.delete("/delete", {
        params
    })
})

// 上传-图片
export const upload = ((params = {}) => {
    return axios.post("/upload", params)
})