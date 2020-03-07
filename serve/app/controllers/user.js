const User = require('../db').User
const Token = require('../utils/token')

// 获取用户信息
const getUser = async (ctx, next) => {
  const id = ctx.params.id
  const res = await User.findOne({
    _id: id
  })
  ctx.status = 200
  console.log('res', res)
  ctx.body = {
    code: 1,
    message: '获取用户信息成功',
    data: {
      _id: res._id,
      username: req.username,
      nickname: req.nickname,
      email: res.email,
      role: res.role,
      updated_time: Date.now()
    }
  }
}

// 获取用户列表
const getUsers = async (ctx, next) => {
  const req = ctx.query
  const page = Number(req.page) || 1
  const showSize = Number(req.showSize) || 10
  const res = await User.find()
    .sort({ updated_time: -1 })
    .skip((page - 1) * showSize)
    .limit(showSize)
  const total = await User.countDocuments()
  ctx.status = 200
  const users = []
  res.forEach(item => {
    users.push({
      _id: item._id,
      username: item.username,
      nickname: item.nickname,
      email: item.email,
      role: item.role,
      updated_time: Date.now()
    })
  })
  ctx.body = {
    code: 1,
    message: '获取用户信息成功',
    data: users,
    total
  }
}

// 注册用户
const registerUser = async (ctx, next) => {
  const req = ctx.request.body
  /**
   * @param role 账号角色：1 管理员，2 注册会员
   */
  const res = await User.create({
    username: req.username,
    nickname: req.nickname,
    password: req.password,
    email: req.email,
    role: 2,
    updated_time: Date.now()
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '注册成功',
    data: {
      _id: res._id,
      username: req.username,
      nickname: req.nickname,
      email: res.email,
      role: res.role,
      updated_time: Date.now()
    }
  }
}

// 删除用户
const deleteUser = async (ctx, next) => {
  const id = ctx.params.id
  await User.deleteOne({
    _id: id
  })
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '删除用户成功'
  }
}

// 登录账号
const loginUser = async (ctx, next) => {
  const req = ctx.request.body
  const res = await User.findOne({
    username: req.username,
    password: req.password
  })
  if (res) {
    ctx.status = 200
    const userInfo = {
      _id: res._id,
      username: req.username
    }
    const token = Token.create(userInfo)
    ctx.body = {
      code: 1,
      message: '登录成功',
      data: {
        _id: res._id,
        username: req.username,
        nickname: req.nickname,
        email: res.email,
        role: res.role,
        token: 'Bearer ' + token,
        updated_time: Date.now()
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 0,
      message: '账号或密码错误'
    }
  }
}

// 更新用户信息
const updatedUser = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  const params = {}
  if (req.nickname) {
    params.nickname = req.nickname
  }
  if (req.email) {
    params.email = req.email
  }
  params.updated_time = Date.now()
  const res = await User.updateOne(
    {
      _id: id
    },
    { ...params }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新用户信息成功',
    data: res
  }
}

// 更新用户权限/密码
const updatedUserRolePW = async (ctx, next) => {
  const id = ctx.params.id
  const req = ctx.request.body
  const params = {}
  if (req.role) {
    params.role = req.role
  }
  if (req.password) {
    params.password = req.password
  }
  params.updated_time = Date.now()
  const res = await User.updateOne(
    {
      _id: id
    },
    { ...params }
  )
  ctx.status = 200
  ctx.body = {
    code: 1,
    message: '更新用户信息成功',
    data: res
  }
}

module.exports = {
  getUser,
  getUsers,
  registerUser,
  deleteUser,
  loginUser,
  updatedUser,
  updatedUserRolePW
}
