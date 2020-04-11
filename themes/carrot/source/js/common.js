$(function () {
  // 隐藏移动端菜单
  $(document).on('click', '.mobile-header', function () {
    $('#header').removeClass('mobile-header')
  })

  const start_time = '2019-04-01 19:56'
  const startTime = new Date(start_time).getTime()
  setInterval(() => {
    weCount(startTime)
  }, 1000)
  
})

// we 计时器
function weCount(startTime) {
  const togetherDom = $('#weTogether')
  const curTime = new Date().getTime()
  const together = distanceTime(curTime, startTime)
  togetherDom.text(together)
}

// 移动端切换菜单
let showMenu = false
function toggleMenu() {
  showMenu = !showMenu
  if (showMenu) {
    $('#header').addClass('mobile-header')
    $('.layout').addClass('transform-layout')
    $('.header-menu .icon-close').removeClass('hidden').addClass('show')
    $('.header-menu .icon-menu').removeClass('show').addClass('hidden')
  } else {
    $('#header').removeClass('mobile-header')
    $('.layout').removeClass('transform-layout')
    $('.header-menu .icon-menu').removeClass('hidden').addClass('show')
    $('.header-menu .icon-close').removeClass('show').addClass('hidden')
  }
}

const distanceTime = (endTime, startTime) => {
  let distance = endTime - startTime
  if (distance > 0) {
    let res = ''
    const year = Math.floor(distance / (365 * 24 * 60 * 60 * 1000))
    distance -= 365 * 24 * 60 * 60 * 1000 * year
    const day = Math.floor(distance / (24 * 60 * 60 * 1000))
    distance -= 24 * 60 * 60 * 1000 * day
    const hour = Math.floor(distance / (60 * 60 * 1000))
    distance -= 60 * 60 * 1000 * hour
    const minute = Math.floor(distance / (60 * 1000))
    distance -= 60 * 1000 * minute
    const second = Math.floor(distance / 1000)
    if (year > 0) {
      res = year + ' 年 '
    }
    if (day > 0) {
      res = res + String(day).padStart(2, '0') + ' 天 '
    }
    if (hour > 0) {
      res = res + String(hour).padStart(2, '0') + ' 时 '
    }
    if (minute > 0) {
      res = res + String(minute).padStart(2, '0') + ' 分 '
    }
    res = res + String(second).padStart(2, '0') + ' 秒'
    return res
  } else {
    return ''
  }
}
