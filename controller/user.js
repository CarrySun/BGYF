
const userModel = require('../sql/user.js')

exports.addUsers = async ctx => {
    let name = ctx.request.body.name;
    let sex = ctx.request.body.sex;
    let phone = ctx.request.body.phone;
    let unit_id = ctx.request.body.unit_id;
    let room_id = ctx.request.body.room_id;
    let job_id = ctx.request.body.job_id;
    let office_id = ctx.request.body.office_id;
    await userModel.insertUser([name, sex, phone, unit_id, office_id, room_id, job_id])
      .then(() => {
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
    let unDelIds = []
    let unDelData = []
    for(let i in ids) {
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
    let office_id = ctx.request.body.office_id;

    await userModel.updateUser([name, sex, phone, unit_id, office_id, room_id, job_id, id])
        .then(() => {
            ctx.body = {
                code:200,
                message:'修改成功'
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
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