import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Blog = () => import(/* webpackChunkName: 'page-blog' */ "@/pages/Blog");
const List = () => import(/* webpackChunkName: 'page-list' */ "@/pages/List");
const Detail = () => import(/* webpackChunkName: 'page-detail' */ "@/pages/Detail");
const Edit = () => import(/* webpackChunkName: 'page-edit' */ "@/pages/Edit");
const Project = () => import(/* webpackChunkName: 'page-project' */ "@/pages/Project");
const Skill = () => import(/* webpackChunkName: 'page-skill' */ "@/pages/Skill");
const About = () => import(/* webpackChunkName: 'page-about' */ "@/pages/About");
const Index = () => import(/* webpackChunkName: 'page-index' */ "@/pages/Index");

const url = [{
    path: '/',
    redirect: '/index'
}, {
    path: '/index',
    component: Index,
    meta: {
        title: "Index",
        showHead: false
    }
}, {
    path: '/blog',
    component: Blog,
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
        isMore: true,
        showHead: true
    }
}, {
    path: '/project',
    component: Project,
    meta: {
        title: "Project",
        showHead: false
    }
}, {
    path: '/skill',
    component: Skill,
    meta: {
        title: "Skill",
        showHead: false
    }
}, {
    path: '/about',
    component: About,
    meta: {
        title: "About",
        showHead: false
    }
}, {
    path: '/tag/:tag',
    component: List,
    meta: {
        title: "List",
        isBack: true,
        isMore: true,
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