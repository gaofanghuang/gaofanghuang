const fs = require('fs');

// 读取文件
function getFile(path, file) {
    let filePath = 'data' + path + file;
    return JSON.parse(fs.readFileSync(filePath))
}

// 写入文件
function postFile(path, file, req) {
    let filePath = 'data' + path + file;
    fs.writeFileSync(filePath, JSON.stringify(req));
}

// 删除文件
function deleteFile(path, file) {
    let filePath = 'data' + path + file;
    fs.unlinkSync(filePath);
}

// ------ api ------

// 获取标签列表
const getImgList = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let imglist = getFile('/json/', 'img.json')
    ctx.body = imglist
}

// 上传图片
const uploadImg = async (ctx, next) => {
    const req = ctx.request.body;
    ctx.status = 200;
    let base64Data = req.base64.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let fileType = req.base64.match(/^data:image\/\w+;/)[0];
    fileType = fileType.split('/')[1].replace(';', '');
    let fileName = Date.now();
    let filePath = 'data/img/' + fileName + '.' + fileType
    fs.writeFile(filePath, dataBuffer, function () {});
    let imgList = getFile('/json/', 'img.json')
    imgList.push({
        id: fileName,
        path: fileName + '.' + fileType,
        name: fileName
    })
    postFile('/json/', 'img.json', imgList)
    ctx.body = {
        message: "上传成功",
        id: fileName,
        path: fileName + '.' + fileType
    }
}

// 修改图片名称
const updatedImg =  async (ctx, next) => {
    const req = ctx.request.body;
    ctx.status = 200;
    
    let imgList = getFile('/json/', 'img.json')
    for (let i in imgList) {
        if (Number(imgList[i].id) === Number(req.id)) {
            imgList[i] = req
        }
    }
    postFile('/json/', 'img.json', imgList)
    ctx.status = 200;
    ctx.body = {
        message: "更新成功"
    }
}

// 删除图片
const deleteImg =  async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;

    let imgList = getFile('/json/', 'img.json')
    let _imgList = imgList.filter(item => item.id != req.id)
    postFile('/json/', 'img.json', _imgList)

    deleteFile('/img/', req.path)

    ctx.status = 200;
    ctx.body = {
        message: "删除成功"
    }
}

// 获取标签列表
const getTags = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let tags = getFile('/json/', 'tags.json')
    ctx.body = tags
}

// 增加标签列表
const addTags = async (ctx, next) => {
    const req = ctx.request.body;
    let tags = getFile('/json/', 'tags.json')
    if (req.pid) {
        for (let item of tags) {
            if (item.id === req.pid) {
                item.tags.push(req)
            }
        }
    } else {
        tags.push({
            ...req,
            tags: []
        })
    }
    postFile('/json/', 'tags.json', tags)
    ctx.status = 200;
    ctx.body = {
        message: "增加成功"
    }
}

// 删除标签
const deleteTag =  async (ctx, next) => {
    const req = ctx.query;
    let tags = getFile('/json/', 'tags.json')
    if (req.pid) {
        for (let i in tags) {
            if (tags[i].id == req.pid) {
                tags[i].tags = tags[i].tags.filter(item => item.id != req.id )
            }
        }
    } else {
        tags = tags.filter(item => item.id != req.id )
    }
    postFile('/json/', 'tags.json', tags)
    ctx.status = 200;
    ctx.body = {
        message: "删除成功"
    }
}

// 获取项目列表
const getList = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let list = getFile('/json/', 'list.json')
    ctx.body = list
}

// 修改项目
const updatedProject = async (ctx, next) => {
    const req = ctx.request.body;
    let list = getFile('/json/', 'list.json')
    let hasItem = false
    for (let i in list) {
        if (Number(list[i].id) === Number(req.id)) {
            list[i] = req
            hasItem = true
        }
    }
    if (!hasItem) {
        list.push(req)
        postFile('/json/', req.id + '.json', [])
    }
    postFile('/json/', 'list.json', list)
    ctx.status = 200;
    ctx.body = {
        message: "修改成功"
    }
}

// 删除项目
const deleteProject =  async (ctx, next) => {
    const req = ctx.query;
    let list = getFile('/json/', 'list.json')
    let _list = list.filter((item) => {
        return Number(item.id) !== Number(req.id)
    })
    postFile('/json/', 'list.json', _list)
    deleteFile('/json/', req.id + '.json')

    ctx.status = 200;
    ctx.body = {
        message: "删除成功"
    }
}

// 获取记录列表
const getLogs = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let list = getFile('/json/', req.id + '.json')
    ctx.body = list
}

// 修改记录
const updatedLog = async (ctx, next) => {
    const req = ctx.request.body;
    let log = getFile('/json/', req.pid + '.json')
    let hasItem = false
    for (let i in log) {
        if (Number(log[i].id) === Number(req.id)) {
            log[i] = req
            hasItem = true
        }
    }
    if (!hasItem) {
        log.push(req)
    }
    postFile('/json/', req.pid + '.json', log)
    ctx.status = 200;
    ctx.body = {
        message: "修改成功"
    }
}

// 删除记录
const deleteLog =  async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let log = getFile('/json/', req.pid + '.json')
    let _log = log.filter((item) => {
        return Number(item.id) !== Number(req.id)
    })
    postFile('/json/', req.pid + '.json', _log)

    ctx.status = 200;
    ctx.body = {
        message: "删除成功"
    }
}

module.exports = {
    getImgList,
    uploadImg,
    updatedImg,
    deleteImg,
    getList,
    updatedProject,
    deleteProject,
    getLogs,
    updatedLog,
    deleteLog,
    getTags,
    addTags,
    deleteTag
}