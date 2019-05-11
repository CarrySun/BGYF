// 办公楼

const router = require('koa-router')();
const controller = require('../controller/office')

router.post('/office/add', controller.addOffices)
router.post('/office/del/:id', controller.delOffices)
router.post('/office/update', controller.updateOffices)
router.get('/office/get', controller.getOffices)

module.exports = router