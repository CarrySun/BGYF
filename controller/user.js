
const userModel = require('../lib/mysql.js')

async function isExcessive(roomId){
    let room
    await userModel.findRoomById([roomId])
        .then(res => {
            room = res[0]
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })
    let user_area = 0
    await userModel.findUsersByRoomId([roomId])
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
    
    if(room.area < user_area) {
        room.excessive = 1
    } else {
        room.excessive = 0
    }
    await userModel.updateExcessive([room.excessive, room.id])
        .then(res => {
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })
}
exports.addUsers = async ctx => {
    let name = ctx.request.body.name;
    let sex = ctx.request.body.sex;
    let phone = ctx.request.body.phone;
    let unit_id = ctx.request.body.unit_id;
    let room_id = ctx.request.body.room_id;
    let job_id = ctx.request.body.job_id;
    await userModel.insertUser([name, sex, phone, unit_id, room_id, job_id])
      .then(() => {
        isExcessive(room_id)
          ctx.body = {
              code:200,
              message:'添加成功'
          }
      }).catch(err => {
          ctx.body = {
              code: 500,
              message: err
          }
      })
}

exports.delUsers = async ctx => {
    let ids = ctx.request.body.ids;
    let oldRoomIds = new Set()
    let unDelIds = []
    let unDelData = []
    for(let i in ids) {
        await userModel.findUserById([ids[i]])
            .then(res => {
                oldRoomIds.add(res[0].room_id)
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
        await userModel.deleteUser([ids[i]])
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
        await userModel.findUserById([unDelIds[i]])
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
    for ( x of oldRoomIds.values()){
        isExcessive(x)
    }
    ctx.body = {
        code:200,
        message:'删除成功',
        data: unDelData
    }
}

exports.updateUsers = async ctx => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let sex = ctx.request.body.sex;
    let phone = ctx.request.body.phone;
    let unit_id = ctx.request.body.unit_id;
    let room_id = ctx.request.body.room_id;
    let job_id = ctx.request.body.job_id;
    
    let oldRoomId
    await userModel.findUserById([id])
        .then(res => {
            oldRoomId = res[0].room_id
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
    await userModel.updateUser([name, sex, phone, unit_id, room_id, job_id, id])
        .then(() => {
            isExcessive(room_id)
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
    isExcessive(oldRoomId)

    ctx.body = {
        code:200,
        message:'修改成功'
    }
    
}

exports.getUsers = async ctx => {
    await userModel.findAllUser()
    .then(result => {
        ctx.body = {
            code: 200,
            message: '查询成功',
            data: result
        }
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err,
        }
    })
}