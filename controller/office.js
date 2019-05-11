
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
    let id = ctx.params.id;
    await officeModel.deleteOffice([id])
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