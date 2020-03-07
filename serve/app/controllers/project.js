const Project = require('../db').Project
const Log = require('../db').Log
const TODO = require('../db').TODO

// 获取项目列表
const getProjects = async (ctx, next) => {
  const req = ctx.query
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const tag = req.tag || ''
  const keyword = req.keyword || ''
  let filter = {}
  if (keyword) {
    filter = {
      $or: [
        { name: { $regex: keyword, $options: '$i' } },
        { describe: { $regex: keyword, $options: '$i' } }
      ]
    }
  } else if (tag) {
    filter = {
      $or: [{ tag: { $regex: tag, $options: '$i' } }]
    }
  }
  const res = await Project.find(filter)
    .sort({ updated_time: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await Project.countDocuments()
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取项目列表成功',
    data: res,
    total
  }
}

// 获取项目详情
const getProjectDetail = async (ctx, next) => {
  const id = ctx.params.id
  const res = await Project.findOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取项目详情成功',
    data: res
  }
}

// 新增项目
const addProject = async (ctx, next) => {
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Project.create({
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '新增项目成功',
    data: res
  }
}

// 更新项目
const updatedProject = async (ctx, next) => {
  const req = ctx.request.body
  const id = ctx.params.id
  req.updated_time = Date.now()
  const res = await Project.updateOne(
    {
      _id: id
    },
    { ...req }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新项目成功',
    data: res
  }
}

// 删除项目
const deleteProject = async (ctx, next) => {
  const id = ctx.params.id
  await Project.deleteOne({
    _id: id
  })
  await Log.deleteMany({
    pid: id
  })
  await TODO.deleteMany({
    pid: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除项目成功'
  }
}

// 获取记录列表
const getLogs = async (ctx, next) => {
  const pid = ctx.params.pid
  const req = ctx.query
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const res = await Log.find({ pid })
    .sort({ _id: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await Log.countDocuments({ pid })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取记录列表成功',
    data: res,
    total
  }
}

// 新增记录
const addLog = async (ctx, next) => {
  const pid = ctx.params.pid
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Log.create({
    pid,
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '新增记录成功',
    data: res
  }
}

// 更新记录
const updatedLog = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Log.updateOne(
    {
      _id: id
    },
    { ...req }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新记录成功',
    data: res
  }
}

// 删除记录
const deleteLog = async (ctx, next) => {
  const id = ctx.params.id
  await Log.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除项目成功'
  }
}

// 获取TODO列表
const getTODO = async (ctx, next) => {
  const pid = ctx.params.pid
  const req = ctx.query
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const res = await TODO.find({ pid })
    .sort({ _id: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await TODO.countDocuments({ pid })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取TODO列表成功',
    data: res,
    total
  }
}

// 新增TODO
const addTODO = async (ctx, next) => {
  const pid = ctx.params.pid
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await TODO.create({
    pid,
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '新增TODO成功',
    data: res
  }
}

// 更新TODO
const updatedTODO = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await TODO.updateOne(
    {
      _id: id
    },
    { ...req }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新TODO成功',
    data: res
  }
}

// 删除TODO
const deleteTODO = async (ctx, next) => {
  const id = ctx.params.id
  await TODO.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除TODO成功'
  }
}

module.exports = {
  getProjects,
  getProjectDetail,
  addProject,
  updatedProject,
  deleteProject,
  getLogs,
  addLog,
  updatedLog,
  deleteLog,
  getTODO,
  addTODO,
  updatedTODO,
  deleteTODO
}
