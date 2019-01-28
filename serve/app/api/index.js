const Router = require('koa-router');
const router = new Router();
const controller = require('../controllers');

router.get('/list', controller.getList);
router.get('/info', controller.getInfo);
router.post('/save', controller.saveItem);
router.delete('/delete', controller.deleteItem);
router.post('/upload', controller.upload);
router.get('/get-project', controller.getProject);
router.post('/save-project', controller.saveProject);

module.exports = router;