// 办公楼

const router = require('koa-router')();
const controller = require('../controller/office')

router.post('/office/add', controller.addOffices)
router.post('/office/del', controller.delOffices)
router.post('/office/update', controller.updateOffices)
router.get('/office/get', controller.getOffices)

// 根据办公楼查房间
router.get('/office/getRoom', controller.getRoomsByOffice)
router.get('/office/getUnChooseRoom', controller.getUnChooseRoomsByOffice)

module.exports = router