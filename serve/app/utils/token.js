const jwt = require('jsonwebtoken')
const tokenKey = Buffer.from(process.env.TOKEN_KEY).toString('base64')
const User = require('../db').User

// 生成token
const create = userInfo => {
  const token = jwt.sign(userInfo, tokenKey, { expiresIn: 1000 * 60 * 60 * 6 })
  return token
}

// 验证token
const check = async (ctx, next) => {
  let token = ctx.request.header.authorization.split(' ')[1]
  if (token) {
    try {
      await jwt.verify(token, tokenKey)
      return next()
    } catch (err) {
      ctx.response.status = 401
      ctx.response.body = {
        message: '登录超时'
      }
    }
  } else {
    ctx.response.status = 401
    ctx.response.body = {
      message: '用户未登录'
    }
  }
}

// 验证是否为管理员
const checkAdmin = async (ctx, next) => {
  let token = ctx.request.header.authorization.split(' ')[1]
  if (token) {
    try {
      const res = await jwt.decode(token)
      const user = await User.findOne({
        _id: res._id
      })
      if (user.role !== 1) {
        throw '当前用户无权限操作'
      }
      return next()
    } catch (err) {
      ctx.response.status = 422
      ctx.response.body = {
        message: err
      }
    }
  }
}

module.exports = {
  create,
  check,
  checkAdmin
}
