
const officeModel = require('../sql/office.js')

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
    let unDelIds = []
    let unDelData = []
    for(let i in ids) {
        await officeModel.deleteOffice([ids[i]])
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
        await officeModel.findOfficeById([unDelIds[i]])
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

exports.getUnChooseRoomsByOffice = async ctx => {
    let id = ctx.query.id;
    await officeModel.findUnChooseRoomsByOffice([id])
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