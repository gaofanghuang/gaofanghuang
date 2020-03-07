const Checklist = require('../db').Checklist
const Entry = require('../db').Entry

// 获取清单列表
const getChecklist = async (ctx, next) => {
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
  const res = await Checklist.find(filter)
    .sort({ updated_time: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await Checklist.countDocuments()
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取清单列表成功',
    data: res,
    total
  }
}

// 获取清单详情
const getCheckDetail = async (ctx, next) => {
  const id = ctx.params.id
  const res = await Checklist.findOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取清单详情成功',
    data: res
  }
}

// 新增清单
const addChecklist = async (ctx, next) => {
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Checklist.create({
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '新增清单成功',
    data: res
  }
}

// 更新清单
const updatedChecklist = async (ctx, next) => {
  const req = ctx.request.body
  const id = ctx.params.id
  req.updated_time = Date.now()
  const res = await Checklist.updateOne(
    {
      _id: id
    },
    { ...req }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新清单成功',
    data: res
  }
}

// 删除清单
const deleteChecklist = async (ctx, next) => {
  const id = ctx.params.id
  await Checklist.deleteOne({
    _id: id
  })
  await Entry.deleteMany({
    pid: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除清单成功'
  }
}

// 获取条目列表
const getEntries = async (ctx, next) => {
  const pid = ctx.params.pid
  const req = ctx.query
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const res = await Entry.find()
    .sort({ _id: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await Entry.countDocuments({ pid })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取条目列表成功',
    data: res,
    total
  }
}

// 新增条目
const addEntry = async (ctx, next) => {
  const pid = ctx.params.pid
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Entry.create({
    pid,
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '新增条目成功',
    data: res
  }
}

// 更新条目
const updatedEntry = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Entry.updateOne(
    {
      _id: id
    },
    { ...req }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新条目成功',
    data: res
  }
}

// 删除条目
const deleteEntry = async (ctx, next) => {
  const id = ctx.params.id
  await Entry.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除清单成功'
  }
}

module.exports = {
  getChecklist,
  getCheckDetail,
  addChecklist,
  updatedChecklist,
  deleteChecklist,
  getEntries,
  addEntry,
  updatedEntry,
  deleteEntry
}
