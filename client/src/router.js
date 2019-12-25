import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Index = () => import(/* webpackChunkName: 'page-index' */ '@/pages/Index');

const url = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: Index,
    meta: {
      name: 'index',
      title: '首页',
    },
  },
  {
    path: '/*',
    redirect: '/',
  },
];

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: url,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});

export default router;
