import Swipe from './swipe'

const directive = {
  install: function (Vue) {
    Vue.directive('swipe', Swipe)
  }
}

export default directive
