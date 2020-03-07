import Vue from 'vue';
import App from './App.vue';
import '@/registerServiceWorker';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/markdown.scss';
import 'highlight.js/styles/github.css';
import * as filters from './utils/filters';
import Storage from './utils/Storage';

Vue.use(ElementUI);

for (const k in filters) {
  Vue.filter(k, filters[k]);
}

Vue.prototype.$db = Storage;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
