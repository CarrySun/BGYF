
const roomModel = require('../lib/mysql.js')

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
    let id = ctx.params.id;
    await roomModel.deleteRoom(id)
        .then(() => {
            ctx.body = {
                code:200,
                message:'删除成功'
            }
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
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