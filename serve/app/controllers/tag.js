const Tag = require('../db').Tag

// 获取标签列表
const getTags = async (ctx, next) => {
  const res = await Tag.find()
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取标签列表成功',
    data: res
  }
}

// 添加标签
const addTag = async (ctx, next) => {
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Tag.create({
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '添加标签成功',
    data: res
  }
}

// 更新标签
const updatedTag = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Tag.updateOne(
    {
      _id: id
    },
    {
      ...req
    }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新标签成功',
    data: res
  }
}

// 删除标签
const deleteTag = async (ctx, next) => {
  const id = ctx.params.id
  await Tag.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除标签成功'
  }
}

module.exports = {
  getTags,
  addTag,
  updatedTag,
  deleteTag
}
