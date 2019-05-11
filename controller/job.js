
const jobModel = require('../sql/job.js')

exports.addJobs = async ctx => {
    let name = ctx.request.body.name;
    let area  = ctx.request.body.area;
    await jobModel.insertJob([name, area])
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

exports.delJobs = async ctx => {
    let ids = ctx.request.body.ids;
    let unDelIds = []
    let unDelData = []
    for(let i in ids) {
        await jobModel.deleteJob([ids[i]])
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
        await jobModel.findJobById([unDelIds[i]])
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

exports.updateJobs = async ctx => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let area  = ctx.request.body.area;
    await jobModel.updateJob([name, area, id])
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

exports.getJobs = async ctx => {
    await jobModel.findAllJob()
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