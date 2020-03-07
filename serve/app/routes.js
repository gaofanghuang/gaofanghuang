const Router = require('koa-router')
const router = new Router()
const controller = require('./controllers')
const Token = require('./utils/token')

/**
 * ------------- 项目模块 -------------
 */
// 获取项目列表
router.get('/projects', controller.project.getProjects)
// 获取项目详情
router.get('/project/:id', controller.project.getProjectDetail)
// 添加项目
router.post('/project', Token.check, Token.checkAdmin, controller.project.addProject)
// 更新项目
router.patch('/project/:id', Token.check, Token.checkAdmin, controller.project.updatedProject)
// 删除项目
router.delete('/project/:id', Token.check, Token.checkAdmin, controller.project.deleteProject)
// 获取项目的记录列表
router.get('/project/:pid/logs', controller.project.getLogs)
// 添加项目记录
router.post('/project/:pid/log', Token.check, Token.checkAdmin, controller.project.addLog)
// 更新项目记录
router.patch('/project/:pid/log/:id', Token.check, Token.checkAdmin, controller.project.updatedLog)
// 删除项目记录
router.delete('/project/:pid/log/:id', Token.check, Token.checkAdmin, controller.project.deleteLog)
// 获取项目的TODO列表
router.get('/project/:pid/todo', controller.project.getTODO)
// 添加项目TODO
router.post('/project/:pid/todo', Token.check, Token.checkAdmin, controller.project.addTODO)
// 更新项目TODO
router.patch('/project/:pid/todo/:id', Token.check, Token.checkAdmin, controller.project.updatedTODO)
// 删除项目TODO
router.delete('/project/:pid/todo/:id', Token.check, Token.checkAdmin, controller.project.deleteTODO)

/**
 * ------------- 清单模块 -------------
 */
// 获取清单列表
router.get('/checklist', controller.checklist.getChecklist)
// 获取清单详情
router.get('/checklist/:id', controller.checklist.getCheckDetail)
// 添加清单
router.post('/checklist', Token.check, Token.checkAdmin, controller.checklist.addChecklist)
// 更新清单
router.patch('/checklist/:id', Token.check, Token.checkAdmin, controller.checklist.updatedChecklist)
// 删除清单
router.delete('/checklist/:id', Token.check, Token.checkAdmin, controller.checklist.deleteChecklist)
// 获取清单的条目列表
router.get('/checklist/:pid/entries', controller.checklist.getEntries)
// 添加清单条目
router.post('/checklist/:pid/entry', Token.check, Token.checkAdmin, controller.checklist.addEntry)
// 更新清单条目
router.patch('/checklist/:pid/entry/:id', Token.check, Token.checkAdmin, controller.checklist.updatedEntry)
// 删除清单条目
router.delete('/checklist/:pid/entry/:id', Token.check, Token.checkAdmin, controller.checklist.deleteEntry)

/**
 * ------------- 评论模块 -------------
 */
// 评论列表
router.get('/comments', controller.comment.getComments)
// 提交评论
router.post('/comment', controller.comment.submitComment)
// 删除评论
router.delete('/comment/:id', Token.check, Token.checkAdmin, controller.comment.deleteComment)
// 回复评论
router.patch('/comment/:id', Token.check, Token.checkAdmin, controller.comment.replyComment)

/**
 * ------------- 标签模块 -------------
 */
// 标签列表
router.get('/tags', controller.tag.getTags)
// 添加标签
router.post('/tag', Token.check, Token.checkAdmin, controller.tag.addTag)
// 更新标签
router.patch('/tag/:id', Token.check, Token.checkAdmin, controller.tag.updatedTag)
// 删除标签
router.delete('/tag/:id', Token.check, Token.checkAdmin, controller.tag.deleteTag)


/**
 * ------------- 图片模块 -------------
 */
// 图片列表
router.get('/images', Token.check, Token.checkAdmin, controller.image.getImages)
// 图片详情
router.get('/img/:id', controller.image.getImage)
// 上传图片
router.post('/image', Token.check, Token.checkAdmin, controller.image.uploadImage)
// 更新图片
router.patch('/image/:id', Token.check, Token.checkAdmin, controller.image.updatedImage)
// 删除图片
router.delete('/image/:id', Token.check, Token.checkAdmin, controller.image.deleteImage)

/**
 * ------------- 用户模块 -------------
 */
// 注册账号
// router.post('/register', controller.user.registerUser)
// 登录账户
router.post('/login', controller.user.loginUser)
// 获取用户信息
router.get('/user/:id', Token.check, Token.checkAdmin, controller.user.getUser)
// 获取用户列表
router.get('/users', Token.check, Token.checkAdmin, controller.user.getUsers)
// 新增用户
router.post('/user', Token.check, Token.checkAdmin, controller.user.registerUser)
// 更新用户信息
router.patch('/user/:id', Token.check, Token.checkAdmin, controller.user.updatedUser)
// 更新用户角色/密码
router.patch('/user/:id/role', Token.check, Token.checkAdmin, controller.user.updatedUserRolePW)
// 删除用户
router.delete('/user/:id', Token.check, Token.checkAdmin, controller.user.deleteUser)

/**
 * ------------- 系统配置 -------------
 */
// 初始化系统
// router.post('/config/init', controller.config.initConfig)
// 获取系统配置
router.get('/config', controller.config.getConfig)
// 修改系统配置
router.patch('/config', Token.check, Token.checkAdmin, controller.config.updatedConfig)
// 获取关于我的信息
router.get('/about', controller.config.getAbout)
// 修改关于我的信息
router.patch('/about', Token.check, Token.checkAdmin, controller.config.updatedAbout)
// 音乐列表
router.get('/music', controller.config.getMusic)
// 添加音乐
router.post('/music', Token.check, Token.checkAdmin, controller.config.addMusic)
// 删除音乐
router.delete('/music/:id', Token.check, Token.checkAdmin, controller.config.deleteMusic)

module.exports = router
