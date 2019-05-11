// 人员

const router = require('koa-router')();
const controller = require('../controller/user')

router.post('/user/add', controller.addUsers)
router.post('/user/del', controller.delUsers)
router.post('/user/update', controller.updateUsers)
router.get('/user/get', controller.getUsers)

module.exports = router