
const unitModel = require('../lib/mysql.js')

exports.addUnits = async ctx => {
    let name = ctx.request.body.name;
    let office_ids  = ctx.request.body.office_ids;
    let job_ids  = ctx.request.body.job_ids;

    let unit_id
    await unitModel.insertUnit([name])
        .then(res => {
            if(res.affectedRows == 1) {
                unit_id = res.insertId
            } else {
                ctx.body = {
                    code: 500,
                    message: '添加失败'
                }
            }
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
    for(let i in office_ids) {
        await unitModel.insertUnitOffice([unit_id, office_ids[i]])
            .then(() => {
                
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
    }
    for(let i in job_ids) {
        await unitModel.insertUnitJob([unit_id, job_ids[i]])
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
        message:'添加成功'
    }
}

exports.delUnits = async ctx => {
    let id = ctx.params.id;
    await unitModel.deleteUnit(id)
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

exports.updateUnits = async ctx => {
  let name = ctx.request.body.name;
  let id = ctx.request.body.id;
  let office_ids  = ctx.request.body.office_ids;
  let job_ids  = ctx.request.body.job_ids;
  await unitModel.updateUnit([id, name, office_ids, job_ids])
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

exports.getUnits = async ctx => {
  await unitModel.findAllUnit()
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