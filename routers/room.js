// 房间

const router = require('koa-router')();
const controller = require('../controller/room')

router.post('/room/add', controller.addRooms)
router.post('/room/del', controller.delRooms)
router.post('/room/update', controller.updateRooms)
router.get('/room/get', controller.getRooms)

router.get('/room/getUser', controller.getUsersByRoomId)

module.exports = router