import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
  },
  {
    path: '/projects',
    component: () => import(/* webpackChunkName: "projects" */ '@/views/ProjectList.vue'),
  },
  {
    path: '/project/:id',
    component: () => import(/* webpackChunkName: "projects" */ '@/views/ProjectDetail.vue'),
  },
  {
    path: '/checklist',
    component: () => import(/* webpackChunkName: "checklist" */ '@/views/Checklist.vue'),
  },
  {
    path: '/checklist/:id',
    component: () => import(/* webpackChunkName: "checklist" */ '@/views/ChecklistDetail.vue'),
  },
  {
    path: '/client',
    component: () => import(/* webpackChunkName: "client" */ '@/views/Client.vue'),
  },
  {
    path: '/comments',
    component: () => import(/* webpackChunkName: "comments" */ '@/views/Comments.vue'),
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
