// 岗位

const router = require('koa-router')();
const controller = require('../controller/job')

router.post('/job/add', controller.addJobs)
router.post('/job/del', controller.delJobs)
router.post('/job/update', controller.updateJobs)
router.get('/job/get', controller.getJobs)

module.exports = router