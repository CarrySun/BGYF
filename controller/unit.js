
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
    let ids = ctx.request.body.ids;
    let unDelIds = []
    let unDelData = []
    for(let i in ids) {
        await unitModel.deleteUnit([ids[i]])
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
        await unitModel.findUnitById([unDelIds[i]])
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

exports.getOfficesByUnitId = async ctx => {
    let id = ctx.query.id;
    await unitModel.findOfficeByUnitId([id])
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

exports.getJobsByUnitId = async ctx => {
    let id = ctx.query.id;
    await unitModel.findJobByUnitId([id])
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

exports.getRoomsByUnitId = async ctx => {
    let id = ctx.query.id;
    let office_ids = []
    await unitModel.findOfficeByUnitId([id])
        .then(res => {
            for(let i in res) {
                office_ids.push(res[i].id)
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })
    let data = []
    for(let i in office_ids) {
        await unitModel.findRoomsByOffice([office_ids[i]])
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

exports.getUsersByUnitId = async ctx => {
    let id = ctx.query.id;
    let user_ids = []
    await unitModel.findUsersByUnitId([id])
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
        await unitModel.findUserById([user_ids[i]])
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

exports.alarmUnit = async ctx => {
    let rooms = []
    let excessive_list = []
    await unitModel.findAllRoom()
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
        await unitModel.findUsersByRoomId([rooms[k].id])
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
        await unitModel.updateRoomExcessive([rooms[k].excessive, rooms[k].id])
            .then(res => {
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
    }
    let units = []
    // var office = {}
    // for(let i in rooms) {
    //     await unitModel.updateUnitByOffice([room[i].id, ])
    //         .then(res => {
    //             units = res
    //         }).catch(err => {
    //             ctx.body = {
    //                 code: 500,
    //                 message: err,
    //             }
    //         })
    // }
    // console.log(units)
    ctx.body = {
        code: 200,
        message: "",
        data: units
    }
}