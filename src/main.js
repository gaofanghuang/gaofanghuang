import Vue from 'vue'
import App from './App'
import '@/assets/scss/common.scss'
import directive from './directive'
import router from './router'

Vue.use(directive)

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'production') {
  // 注册service-worker.js
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(function (reg) {
      console.log('Successfully registered service worker', reg)
    }).catch(function (err) {
      console.warn('Error whilst registering service worker', err)
    })
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
