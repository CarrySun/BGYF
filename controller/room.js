
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
    let ids = ctx.request.body.ids;
    for(let i in ids) {
        await roomModel.deleteRoom([ids[i]])
            .then(() => {
               
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
        message:'删除成功'
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

exports.getUsersByRoomId = async ctx => {
    let id = ctx.query.id;
    let user_ids = []
    await roomModel.findUsersByRoomId([id])
        .then(res => {
            console.log(res)
            for(let i in res) {
                user_ids.push(res[i].id)
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })
    let data = []
    for(let i in user_ids) {
        await roomModel.findUserById([user_ids[i]])
            .then(res => {
                console.log(res)
                for(let j in res) {
                    data.push(res[j])
                }
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
    }
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: data
    }
}