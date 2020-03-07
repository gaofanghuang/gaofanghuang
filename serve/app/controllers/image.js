const Image = require('../db').Image
const FS = require('../utils/fs')

// 获取图片列表
const getImages = async (ctx, next) => {
  const req = ctx.query
  const category = req.category
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const res = await Image.find({ category })
    .sort({ _id: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await Image.countDocuments({ category })

  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取图片列表成功',
    data: res,
    total
  }
}

// 获取图片
const getImage = async (ctx, next) => {
  const id = ctx.params.id
  const res = await Image.findOne({ _id: id })
  if (res) {
    ctx.status = 200
    ctx.body = res.path
  } else {
    ctx.status = 404
    ctx.body = {
      code: 0,
      message: '图片资源不存在'
    }
  }
}

// 上传图片
const uploadImage = async (ctx, next) => {
  const req = ctx.request.body
  // category: 1 默认分类 2 表情分类 3 头像分类
  const category = req.category || '1'
  const image = FS.toBuffer(req.base64)
  const curTime = Date.now()
  const filePath = `${curTime}.${image.type}`
  console.log('传图', 111)
  FS.writeImg(filePath, image.data)
  const res = await Image.create({
    name: curTime,
    path: `${curTime}.${image.type}`,
    category: category,
    updated_time: curTime
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '上传图片成功',
    data: res
  }
}

// 更新图片
const updatedImage = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  const res = await Image.updateOne(
    {
      _id: id
    },
    {
      name: req.name,
      updated_time: Date.now()
    }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新图片成功',
    data: res
  }
}

// 删除图片
const deleteImage = async (ctx, next) => {
  const id = ctx.params.id
  const res = await Image.findOne({
    _id: id
  })
  FS.deleteImg(res.path)
  await Image.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除图片成功'
  }
}

module.exports = {
  getImages,
  getImage,
  uploadImage,
  updatedImage,
  deleteImage
}
