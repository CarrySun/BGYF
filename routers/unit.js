// 单位

const router = require('koa-router')();
const controller = require('../controller/unit')

router.post('/unit/add', controller.addUnits)
router.post('/unit/del/:id', controller.delUnits)
router.post('/unit/update', controller.updateUnits)
router.get('/unit/get', controller.getUnits)

module.exports = router