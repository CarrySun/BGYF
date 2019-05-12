// 单位

const router = require('koa-router')();
const controller = require('../controller/unit')

router.post('/unit/add', controller.addUnits)
router.post('/unit/del', controller.delUnits)
router.post('/unit/update', controller.updateUnits)
router.get('/unit/get', controller.getUnits)

// 根据单位查办公楼
router.get('/unit/getOffice', controller.getOfficesByUnitId)

// 根据单位和办公楼查询房间
router.get('/unit/getOfficeRoom', controller.getRoomsByUnitIdAndOfficeId)

// 根据单位查岗位
router.get('/unit/getJob', controller.getJobsByUnitId)

// 根据单位查人员
router.get('/unit/getUser', controller.getUsersByUnitId)

// 报警
router.get('/unit/alarm', controller.alarmUnit)

module.exports = router