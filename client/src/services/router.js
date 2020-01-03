import Vue from 'vue';
import Router from 'vue-router';
import { clientOS } from '@/services/utils';

Vue.use(Router);

const url = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: 'page-mobile' */ '@/pages/Index'),
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
      title: '项目列表',
    },
  },
  {
    path: '/project/:id',
    component: () => import(/* webpackChunkName: 'page-detail' */ '@/pages/Detail'),
    meta: {
      name: 'project_detail',
      title: '项目详情',
      back: true,
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
    path: '/pc/index',
    component: () => import(/* webpackChunkName: 'page-mobile' */ '@/pages/Index'),
    meta: {
      name: 'pc_index',
      title: '首页',
    },
  },
  {
    path: '/pc/project',
    component: () => import(/* webpackChunkName: 'page-project' */ '@/pages/Project'),
    meta: {
      name: 'pc_project',
      title: '项目',
    },
  },
  {
    path: '/pc/project/:id',
    component: () => import(/* webpackChunkName: 'page-detail' */ '@/pages/Detail'),
    meta: {
      name: 'pc_project_detail',
      title: '项目详情',
    },
  },
  {
    path: '/pc/about',
    component: () => import(/* webpackChunkName: 'page-about' */ '@/pages/About'),
    meta: {
      name: 'pc_about',
      title: '关于我',
    },
  },
  {
    path: '/pc/set',
    component: () => import(/* webpackChunkName: 'page-set' */ '@/pages/Set'),
    meta: {
      name: 'pc_set',
      title: '设置',
    },
  },
  {
    path: '/pc/*',
    redirect: '/pc/index',
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

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
  const isMobile = clientOS().isMobile;
  const isPcRouter = to.path.includes('pc');
  if (isMobile) {
    if (isPcRouter) {
      next({
        path: to.path.replace('/pc', ''),
      });
    } else {
      next();
    }
  } else {
    if (isPcRouter) {
      next();
    } else {
      next({
        path: '/pc' + to.path,
      });
    }
  }
});

export default router;
