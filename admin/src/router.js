import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const DataCount = () => import(/* webpackChunkName: 'tag' */ "@/pages/count/DataCount");
const ProjectList = () => import(/* webpackChunkName: 'project' */ "@/pages/project/ProjectList");
const ProjectInfo = () => import(/* webpackChunkName: 'project' */ "@/pages/project/ProjectInfo");
const Tags = () => import(/* webpackChunkName: 'tags' */ "@/pages/tags/Tags");
const ImgBox = () => import(/* webpackChunkName: 'project' */ "@/pages/imgbox/ImgBox");

const url = [
    {
        path: '/',
        redirect: '/data-count'
    }, {
        path: '/data-count',
        component: DataCount,
        meta: {
            title: "数据统计"
        }
    }, {
        path: '/project-list',
        component: ProjectList,
        meta: {
            title: "项目列表"
        }
    }, {
        path: '/project-info/:id',
        component: ProjectInfo,
        meta: {
            title: "项目详情"
        }
    }, {
        path: '/tags',
        component: Tags,
        meta: {
            title: "标签"
        }
    }, {
        path: '/img-box',
        component: ImgBox,
        meta: {
            title: "图片库"
        }
    }
]

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