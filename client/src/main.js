import Vue from 'vue';
import App from '@/App.vue';
import '@/registerServiceWorker';
import '@/style/common.scss';
import 'highlight.js/styles/github.css';
import '@/assets/iconfont.js';
import DomPortal from 'vue-dom-portal';
import router from '@/services/router';
import store from '@/services/store';
import components from '@/components/common';
import * as filters from '@/services/filters';
import Storage from '@/services/Storage';

Vue.use(DomPortal);

Vue.config.productionTip = false;

for (const k in filters) {
  Vue.filter(k, filters[k]);
}

components.forEach(component => {
  Vue.component(component.name, component);
});

Vue.prototype.$db = Storage;
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
