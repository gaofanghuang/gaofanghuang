$(function () {
  let banner = $('#bannerAni')
  if (banner.length) {
    const canvas = document.querySelector('#bannerAni')
    const ctx = canvas.getContext('2d')

    const border = {
      top: 0,
      left: 0,
      right: $('.index-banner, .page-banner').width(),
      bottom: $('.index-banner, .page-banner').height(),
    }
    canvas.width = $('.index-banner, .page-banner').width()
    canvas.height = $('.index-banner, .page-banner').height()

    let balls = []

    let ballNumber = 25

    // 重力加速度
    const speed = 0.2
    // 反弹系数
    const bounce = -0.8

    // 生成n个不同形状和颜色的小球
    for (let i = 0; i < ballNumber; i++) {
      let size = 4 + Math.random() * 2 // 大小
      let color = 'rgba(0, 0, 0, 0.2)' // 颜色
      ball = new Ball(size, color)
      ball.id = `ball_${i}`
      ball.x = Math.random() * border.right
      ball.y = 0
      ball.vx = Math.random() * 2 + 1
      ball.vy = Math.random() * 2 + 1

      balls.push(ball)
    }

    // 绘制图形
    function drawBall(ball, pos) {
      ball.vy += speed
      ball.y += ball.vy

      // 边界反弹
      if (ball.y + ball.radius > border.bottom) {
        ball.y = border.bottom - ball.radius
        ball.vy *= bounce
      }

      ball.draw(ctx)
    }

    function drawFrame() {
      clear()
      raf = window.requestAnimationFrame(drawFrame)
      let i = balls.length
      while (i--) {
        drawBall(balls[i], i)
      }
    }

    // 清除画布
    function clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = canvas.width
      canvas.height = canvas.height
    }

    drawFrame()
  }
})

// 定义一个小球的类
class Ball {
  constructor(radius = 25, color = 'blue') {
    this.x = 100
    this.y = 100
    this.vx = 5
    this.vy = 2
    this.ax = 0
    this.ay = 0
    this.scale = 1
    this.radius = radius
    this.color = color
    this.id = ''
    this.angle = 0
    this.opacity = 1
  }
  draw(ctx) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.restore()
  }
  getBounds() {
    return {
      left: this.x - this.radius,
      top: this.y - this.radius,
      right: this.x + this.radius,
      bottom: this.y + this.radius,
    }
  }
}
