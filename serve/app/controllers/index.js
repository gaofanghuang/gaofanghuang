const fs = require('fs');

// 读取文件
function getFile(path = 'list') {
    let filePath = 'data/' + path + '.json'
    return JSON.parse(fs.readFileSync(filePath))
}

// 写入文件
function postFile(path = 'list', req) {
    let filePath = 'data/' + path + '.json';
    fs.writeFileSync(filePath, JSON.stringify(req));
}

// 删除文件
function deleteFile(id) {
    let filePath = 'data/' + id + '.json';
    fs.unlinkSync(filePath);
}

// 获取列表
const getList = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let list = getFile('list')
    ctx.body = list
}

// 读取文章
const getInfo = async (ctx, next) => {
    const req = ctx.query;
    ctx.status = 200;
    let info = getFile(req.id)
    ctx.body = {
        ...info
    }
}

// 保存文章
const saveItem = async (ctx, next) => {
    const req = ctx.request.body;
    let item = {
        id: req.id,
        lasttime: req.lasttime,
        title: req.title,
        tags: req.tags,
        summary: req.summary
    }
    // 更新列表
    let list = getFile('list')

    let hasItem = false
    for (let i in list) {
        if (Number(list[i].id) === Number(req.id)) {
            hasItem = true
            list[i] = item
        }
    }
    if (!hasItem) {
        list.push(item)
    }
    postFile('list', list)
    // 创建/修改文章
    postFile(req.id, req)

    let res = {}
    res.message = "修改成功"
    if (req.id === req.lasttime) {
        res.message = "添加成功"
        res.id = req.id
    }
    ctx.status = 200;
    ctx.body = res
}

// 删除文章
const deleteItem = async (ctx, next) => {
    const req = ctx.query;
    // 删除列表
    let list = getFile('list')
    let _list = list.filter((item) => {
        return Number(item.id) !== Number(req.id)
    })
    postFile('list', _list)

    // 删除文章
    deleteFile(req.id)

    ctx.status = 200;
    ctx.body = {
        message: "删除成功"
    }
}

// 上传图片

const upload = async (ctx, next) => {
    const req = ctx.request.body;
    ctx.status = 200;
    let base64Data = req.base64.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64Data, 'base64');
    let fileType = req.base64.match(/^data:image\/\w+;/)[0];
    fileType = fileType.split('/')[1].replace(';', '');
    let filleName = Date.now();
    let filePath = 'public/uploads/' + filleName + '.' + fileType
    fs.writeFile(filePath, dataBuffer, function (err) {
        console.log(err);
    });
    ctx.body = {
        message: "上传成功",
        id: filleName + '.' + fileType
    }
}

module.exports = {
    getList,
    getInfo,
    saveItem,
    deleteItem,
    upload
}