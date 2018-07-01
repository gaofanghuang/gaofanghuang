let x1
let y1
let x2
let y2

function move (e, el) {
  x2 = e.changedTouches[0].pageX
  y2 = e.changedTouches[0].pageY
  let devW = e.target.offsetWidth
  let devH = e.target.offsetHeight
  let direction
  if (devW < 10 || devH < 10) {
    return
  }
  if (Math.abs(y2 - y1) > 10 && Math.abs(x2 - x1) < Math.abs(y2 - y1)) {
    if (y2 > y1) {
      direction = 'down'
    } else {
      direction = 'up'
    }
  } else if (Math.abs(x2 - x1) > 10 && Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
    if (x2 > x1) {
      direction = 'right'
    } else {
      direction = 'left'
    }
  }
  let data = {
    direction: direction,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    devW: devW,
    devH: devH
  }
  if (Math.abs(y2 - y1) > 10 || Math.abs(x2 - x1) > 10) {
    el.handler(data)
  }
}

let canRun = true
const swiperDo = {
  acceptStatement: true,
  bind: function (el, binding) {
    el.handler = function (e) {
      let value = binding.value
      e.index = value.index
      value.methods.call(this, e)
    }
    el.addEventListener('touchstart', function (e) {
      x1 = e.touches[0].pageX
      y1 = e.touches[0].pageY
    }, false)

    el.addEventListener('touchend', function (e) {
      if (!canRun) {
        return
      }
      move(e, el)
      canRun = false
      setTimeout(function () {
        // 函数节流
        canRun = true
      }, 600)
    }, false)
  }
}

export default swiperDo
