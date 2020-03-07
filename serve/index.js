const koa = require('koa')
const path = require('path')
const app = new koa()
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
// const sslify = require('koa-sslify').default
const https = require('https')
const fs = require('fs')

const dotenv = require('dotenv')
dotenv.config('./env')

app.use(static(path.join(__dirname) + '/data/'))

app.use(bodyParser())
app.use(cors())

// 生产环境使用https协议
if (process.env.NODE_ENV === 'production') {
  // app.use(sslify())
  // // SSL options
  // const options = {
  //   key: fs.readFileSync(
  //     path.join(__dirname, './' + process.env.SSL_KEY + '.key')
  //   ),
  //   cert: fs.readFileSync(
  //     path.join(__dirname, './' + process.env.SSL_PEM + '.pem')
  //   )
  // }
  // // 创建https 服务
  // const httpsServer = https.createServer(options, app.callback())
  // httpsServer.listen(process.env.PORT)
  app.listen(process.env.PORT)
} else {
  app.listen(process.env.PORT)
}

const routes = require('./app/routes')
app.use(routes.routes()).use(routes.allowedMethods())

console.log(`app started at port ${process.env.PORT}...`)

const handler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500
    ctx.response.body = {
      message: err.message
    }
    ctx.app.emit('error', err, ctx);
  }
}

const main = ctx => {
  ctx.throw(500)
}

app.use(handler)
app.use(main)

app.on('error', (err, next) => {
  console.error('server error', err)
})
