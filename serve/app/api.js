const Router = require('koa-router');
const router = new Router();
const controller = require('./controllers');

router.get('/getImgList', controller.getImgList);
router.post('/uploadImg', controller.uploadImg);
router.post('/updatedImg', controller.updatedImg);
router.delete('/deleteImg', controller.deleteImg);
router.get('/getList', controller.getList);
router.post('/updatedProject', controller.updatedProject);
router.delete('/deleteProject', controller.deleteProject);
router.get('/getLogs', controller.getLogs);
router.post('/updatedLog', controller.updatedLog);
router.delete('/deleteLog', controller.deleteLog);
router.get('/getTags', controller.getTags);
router.post('/addTags', controller.addTags);
router.delete('/deleteTag', controller.deleteTag);


module.exports = router;