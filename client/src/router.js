import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from '@/pages/Home'
import List from '@/pages/List'
import Detail from '@/pages/Detail'
import Edit from '@/pages/Edit'

const url = [{
    path: '/',
    redirect: '/home'
}, {
    path: '/home',
    component: Home,
    meta: {
        title: "OF",
        isSearch: true,
        isAdd: true,
        showHead: true
    }
}, {
    path: '/list',
    component: List,
    meta: {
        title: "List",
        isBack: true,
        showHead: true
    }
}, {
    path: '/tag/:tag',
    component: List,
    meta: {
        title: "List",
        isBack: true,
        showHead: true
    }
}, {
    path: '/detail/:id',
    component: Detail,
    meta: {
        title: "Detail",
        isBack: true,
        isMore: true,
        isMenu: true,
        showHead: true
    }
}, {
    path: '/edit/:id',
    meta: {
        isBack: true,
        isSave: true,
        showHead: true,
        title: "Edit"
    },
    component: Edit
}, {
    path: '/add',
    meta: {
        isBack: true,
        isSave: true,
        showHead: true,
        title: ""
    },
    component: Edit
}, {
    path: '/*',
    redirect: '/'
}]

const router = new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes: url,
    scrollBehavior(to, from, savedPosition) {
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

router.beforeEach(({
    meta,
    path
}, from, next) => {
    let {
        production = true
    } = meta
    let isProduction = process.env.NODE_ENV === 'production'

    if (!production && isProduction && path.includes('edit')) {
        return next({
            path: '/home'
        })
    }
    next()
})

export default router