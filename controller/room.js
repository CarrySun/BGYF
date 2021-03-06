
const roomModel = require('../sql/room.js')

exports.addRooms = async ctx => {
    let name = ctx.request.body.name;
    let area  = ctx.request.body.area;
    let office_id  = ctx.request.body.office_id;
    await roomModel.insertRoom([name, area, office_id])
      .then(() => {
          ctx.body = {
              code:200,
              message:'添加成功'
          }
      })
      .catch(err => {
          ctx.body = {
              code: 500,
              message: err
          }
      })
}

exports.delRooms = async ctx => {
    let ids = ctx.request.body.ids;
    let unDelIds = []
    let unDelData = []
    for(let i in ids) {
        await roomModel.deleteRoom([ids[i]])
            .then(() => {
            })
            .catch(err => {
                if(err.code == 'ER_ROW_IS_REFERENCED_2') {
                    unDelIds.push(ids[i])
                }
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
    }
    for(let i in unDelIds) {
        await roomModel.findRoomById([unDelIds[i]])
            .then(res => {
                unDelData.push(res[0].name)
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
    }
    ctx.body = {
        code:200,
        message:'删除成功',
        data: unDelData
    }
}


exports.updateRooms = async ctx => {
  let id = ctx.request.body.id;
  let name = ctx.request.body.name;
  let area  = ctx.request.body.area;
  let office_id  = ctx.request.body.office_id;
  await roomModel.updateRoom([name, area, office_id, id])
    .then(() => {
        ctx.body = {
            code:200,
            message:'修改成功'
        }
    })
    .catch(err => {
        ctx.body = {
            code: 500,
            message: err
        }
    })
}

exports.getRooms = async ctx => {
  await roomModel.findAllRoom()
    .then(result => {
        ctx.body = {
            code: 200,
            message: '查询成功',
            data: result
        }
    })
    .catch(err => {
        ctx.body = {
            code: 500,
            message: err,
        }
    })
}