const Router = require('koa-router');
const router = new Router();
const controller = require('../controllers');

router.get('/list', controller.getList);
router.get('/info', controller.getInfo);
router.post('/save', controller.saveItem);
router.delete('/delete', controller.deleteItem);
router.post('/upload', controller.upload);

module.exports = router;