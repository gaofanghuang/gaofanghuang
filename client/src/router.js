import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import(/* webpackChunkName: 'page-index' */ "@/pages/home/Index")
const ProjectList = () => import(/* webpackChunkName: 'page-project' */ "@/pages/project/List")
const ProjectInfo = () => import(/* webpackChunkName: 'page-project' */ "@/pages/project/Info")
const About = () => import(/* webpackChunkName: 'page-about' */ "@/pages/about/About")

const url = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/index',
    component: Index,
    meta: {
        name: 'index',
        title: "首页"
    }
}, {
    path: '/list',
    component: ProjectList,
    meta: {
        name: 'list',
        title: "列表"
    }
}, {
    path: '/info/:id',
    component: ProjectInfo,
    meta: {
        name: 'info',
        title: "详情"
    }
}, {
    path: '/about',
    component: About,
    meta: {
        name: 'about',
        title: "关于"
    }
}, {
    path: '/*',
    redirect: '/'
}]

const router = new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: url,
    scrollBehavior(to) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        } else {
            return {
                x: 0, 
                y: 0
            }
        }
    }
})

export default router