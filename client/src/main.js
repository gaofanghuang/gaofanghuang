import App from './App.vue';
import router from './router';
import store from './store';
import "./util/rem";
import "./assets/iconfont";
import '@/style/common.scss';
import 'highlight.js/styles/github.css';
import "./components/common";
import DomPortal from 'vue-dom-portal';
import * as filters from "./util/filters";
import FastClick from 'fastclick';

FastClick.attach(document.body);

Vue.use(DomPortal);

for (const k in filters) {
  Vue.filter(k, filters[k]);
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
