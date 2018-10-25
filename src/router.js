import Vue from 'vue'
import VueRouter from 'vue-router'
import CV from '@/pages/cv'
import Home from '@/pages/home'
import Project from '@/pages/project'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/cv',
    component: CV
  }, {
    path: '/project',
    component: Project
  }],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
