
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

exports.getUsersByRoomId = async ctx => {
    let id = ctx.query.id;
    let user_ids = []
    await roomModel.findUsersByRoomId([id])
        .then(res => {
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

exports.alarmRoom = async ctx => {
    let rooms = []
    let excessive_list = []
    await roomModel.findAllRoom()
        .then(res => {
            for(let i in res) {
                rooms.push(res[i])
            }
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })
    for(let k in rooms) {
        let user_area = 0
        await roomModel.findUsersByRoomId([rooms[k].id])
            .then(res => {
                for(let i in res) {
                    user_area += res[i].job_area
                }
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
        
        if(rooms[k].area < user_area) {
            rooms[k].excessive = 1
            excessive_list.push(rooms[k])
        } else {
            rooms[k].excessive = 0
        }
        await roomModel.updateExcessive([rooms[k].excessive, rooms[k].id])
            .then(res => {
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
    }
    ctx.body = {
        code: 200,
        message: "",
        data: excessive_list
    }
}
