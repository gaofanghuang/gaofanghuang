const Comment = require('../db').Comment

// 获取评论列表
const getComments = async (ctx, next) => {
  const req = ctx.query
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const res = await Comment.find()
    .sort({ _id: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await Comment.countDocuments()
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取评论列表成功',
    data: res,
    total
  }
}

// 提交评论
const submitComment = async (ctx, next) => {
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Comment.create({
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '评论提交成功',
    data: res
  }
}

// 删除评论
const deleteComment = async (ctx, next) => {
  const ids = ctx.params.id.split(',')
  for (let id of ids) {
    await Comment.deleteOne({
      _id: id
    })
  }
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除评论成功'
  }
}

// 回复评论
const replyComment = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  const res = await Comment.updateOne(
    {
      _id: id
    },
    {
      reply: req.reply,
      reply_time: Date.now()
    }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '回复评论成功',
    data: res
  }
}

module.exports = {
  getComments,
  submitComment,
  deleteComment,
  replyComment
}
