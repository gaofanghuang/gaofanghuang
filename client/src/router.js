import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const url = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: 'page-index' */ '@/pages/Index'),
    meta: {
      name: 'index',
      title: '首页',
    },
  },
  {
    path: '/project',
    component: () => import(/* webpackChunkName: 'page-project' */ '@/pages/Project'),
    meta: {
      name: 'project',
      title: '项目',
    },
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: 'page-about' */ '@/pages/About'),
    meta: {
      name: 'about',
      title: '关于我',
    },
  },
  {
    path: '/set',
    component: () => import(/* webpackChunkName: 'page-set' */ '@/pages/Set'),
    meta: {
      name: 'set',
      title: '设置',
      back: true,
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
