
const userModel = require('../lib/mysql.js')

exports.addUsers = async ctx => {
    let name = ctx.request.body.name;
    let sex = ctx.request.body.sex;
    let phone = ctx.request.body.phone;
    let unit_id = ctx.request.body.unit_id;
    let room_id = ctx.request.body.room_id;
    let job_id = ctx.request.body.job_id;
    await userModel.insertUser([name, sex, phone, unit_id, room_id, job_id])
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
    let id = ctx.params.id;
    await userModel.deleteUser(id)
        .then(() => {
            ctx.body = {
                code:200,
                message:'删除成功'
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
}

exports.updateUsers = async ctx => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let sex = ctx.request.body.sex;
    let phone = ctx.request.body.phone;
    let unit_id = ctx.request.body.unit_id;
    let room_id = ctx.request.body.room_id;
    let job_id = ctx.request.body.job_id;
    await userModel.updateUser([name, sex, phone, unit_id, room_id, job_id, id])
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