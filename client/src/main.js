import Vue from 'vue';
import App from '@/App.vue';
import router from '@/services/router';
import store from '@/services/store';
import '@/style/common.scss';
import 'highlight.js/styles/github.css';
import DomPortal from 'vue-dom-portal';
import * as filters from '@/services/filters';
import FastClick from 'fastclick';
import Storage from '@/services/Storage';
import '@/assets/iconfont.js';
import components from '@/components/common';

Vue.config.productionTip = false;

FastClick.attach(document.body);

Vue.use(DomPortal);

for (const k in filters) {
  Vue.filter(k, filters[k]);
}

components.forEach(component => {
  Vue.component(component.name, component);
});

Vue.prototype.$db = Storage;
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
