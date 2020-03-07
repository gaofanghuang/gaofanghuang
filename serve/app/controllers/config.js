const Config = require('../db').Config
const User = require('../db').User
const About = require('../db').About
const Music = require('../db').Music

// 初始化系统
const initConfig = async (ctx, next) => {
  const config = await Config.find()
  const req = ctx.request.body
  if (config.length > 0) {
    ctx.status = 422
    ctx.body = {
      code: 0,
      message: '已初始化过系统，请勿重复操作！'
    }
  } else {
    // 1. 初始化管理员
    await User.create({
      username: req.username,
      nickname: req.username,
      password: req.password,
      email: 'admin@admin.com',
      role: 1,
      updated_time: Date.now()
    })
    // 2. 初始化系统配置
    await Config.create({
      hasInit: true,
      canRegister: false,
      canComment: false,
      updated_time: Date.now()
    })
    // 3. 初始化关于
    await About.create({
      content: '',
      updated_time: Date.now()
    })
    ctx.status = 200
    ctx.body = {
      code: 1,
      message: '初始化系统成功'
    }
  }
}

// 获取系统配置
const getConfig = async (ctx, next) => {
  const res = await Config.find()
  ctx.status = 200
  ctx.body = {
    code: res.length > 0 ? 1 : 0,
    message: '获取系统配置成功',
    data: res.length > 0 ? res[0]: null
  }
}

// 更新系统配置
const updatedConfig = async (ctx, next) => {
  const req = ctx.request.body
  const config = await Config.find()
  const id = config[0]._id
  req.updated_time = Date.now()
  const res = await Config.updateOne(
    {
      _id: id
    },
    {
      canRegister: req.canRegister,
      canComment: req.canComment
    }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新系统配置成功',
    data: res
  }
}

// 获取关于
const getAbout = async (ctx, next) => {
  const res = await About.find()
  ctx.status = 200
  ctx.body = {
    code: res.length > 0 ? 1 : 0,
    message: '获取关于我的信息成功',
    data: res.length > 0 ? res[0]: null
  }
}

// 更新关于
const updatedAbout = async (ctx, next) => {
  const req = ctx.request.body
  const about = await About.find()
  const id = about[0]._id
  req.updated_time = Date.now()
  const res = await About.updateOne(
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
    message: '更新关于我的信息成功',
    data: res
  }
}

// 获取音乐列表
const getMusic = async (ctx, next) => {
  const res = await Music.find()
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '获取音乐列表成功',
    data: res
  }
}

// 添加音乐
const addMusic = async (ctx, next) => {
  const req = ctx.request.body
  req.updated_time = Date.now()
  const res = await Music.create({
    ...req
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '添加音乐成功',
    data: res
  }
}

// 删除音乐
const deleteMusic = async (ctx, next) => {
  const id = ctx.params.id
  await Music.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除音乐成功'
  }
}

module.exports = {
  initConfig,
  getConfig,
  updatedConfig,
  getAbout,
  updatedAbout,
  getMusic,
  addMusic,
  deleteMusic
}
