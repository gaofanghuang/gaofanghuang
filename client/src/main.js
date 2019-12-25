import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/style/common.scss';
import 'highlight.js/styles/github.css';
import DomPortal from 'vue-dom-portal';
import * as filters from './utils/filters';
import FastClick from 'fastclick';
import Storage from './utils/Storage';

Vue.config.productionTip = false;

FastClick.attach(document.body);

Vue.use(DomPortal);

for (const k in filters) {
  Vue.filter(k, filters[k]);
}

Vue.prototype.$db = Storage;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
