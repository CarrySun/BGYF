
const officeModel = require('../lib/mysql.js')

exports.addOffices = async ctx => {
    let name = ctx.request.body.name;
    await officeModel.insertOffice([name])
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

exports.delOffices = async ctx => {
    let ids = ctx.request.body.ids;
    for(let i in ids) {
        await officeModel.deleteOffice([ids[i]])
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

exports.updateOffices = async ctx => {
    let name = ctx.request.body.name;
    let id = ctx.request.body.id;
    await officeModel.updateOffice([name, id])
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

exports.getOffices = async ctx => {
    await officeModel.findAllOffice()
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

exports.getUnitsByOffice = async ctx => {
    let id = ctx.query.id;
    await officeModel.findUnitsByOffice([id])
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

exports.getRoomsByOffice = async ctx => {
    let id = ctx.query.id;
    await officeModel.findRoomsByOffice([id])
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