import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/pages/Layout';

Vue.use(Router);

const url = [
  {
    path: '/',
    component: Layout,
    redirect: '/data-count',
    children: [
      {
        path: 'data-count',
        component: () => import(/* webpackChunkName: 'count' */ '@/pages/count/DataCount'),
        meta: {
          title: '数据统计',
          auth: true,
        },
      },
      {
        path: 'projects',
        component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/ProjectList'),
        meta: {
          title: '项目列表',
          auth: true,
        },
      },
      {
        path: 'project/:id',
        component: () => import(/* webpackChunkName: 'project' */ '@/pages/project/ProjectInfo'),
        meta: {
          title: '项目详情',
          auth: true,
        },
      },
      {
        path: 'checklist',
        component: () => import(/* webpackChunkName: 'checklist' */ '@/pages/checklist/Checklist'),
        meta: {
          title: '清单管理',
          auth: true,
        },
      },
      {
        path: 'checklist/:id',
        component: () =>
          import(/* webpackChunkName: 'checklist' */ '@/pages/checklist/CheckDetail'),
        meta: {
          title: '清单详情',
          auth: true,
        },
      },
      {
        path: 'tags',
        component: () => import(/* webpackChunkName: 'tag' */ '@/pages/tags/Tags'),
        meta: {
          title: '标签',
          auth: true,
        },
      },
      {
        path: 'img-box',
        component: () => import(/* webpackChunkName: 'image' */ '@/pages/imgbox/ImgBox'),
        meta: {
          title: '图片库',
          auth: true,
        },
      },
      {
        path: 'users',
        component: () => import(/* webpackChunkName: 'user' */ '@/pages/user/Users'),
        meta: {
          title: '用户管理',
          auth: true,
        },
      },
      {
        path: 'comments',
        component: () => import(/* webpackChunkName: 'comments' */ '@/pages/comments/Comments'),
        meta: {
          title: '评论管理',
          auth: true,
        },
      },
      {
        path: 'set',
        component: () => import(/* webpackChunkName: 'set' */ '@/pages/set/Index'),
        meta: {
          title: '系统设置',
          auth: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: 'login' */ '@/pages/user/Login'),
    meta: {
      title: '登录',
    },
  },
  // {
  //   path: '/register',
  //   component: () =>
  //     import(/* webpackChunkName: 'register' */ '@/pages/user/Register'),
  //   meta: {
  //     title: '注册'
  //   }
  // }
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

// 路由守护
router.beforeEach((to, from, next) => {
  const hasToken = localStorage.getItem('token');
  console.log('hasToken', hasToken);
  if (to.meta.auth) {
    // 权限判断
    if (hasToken !== null) {
      // 读取token值
      // 成功
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    // 没有meta.auth 不用管
    if (to.path === '/login' && hasToken) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  }
});

export default router;
