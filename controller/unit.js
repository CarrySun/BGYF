
const unitModel = require('../sql/unit.js')
const userModel = require('../sql/user.js')
const roomModel = require('../sql/room.js')

exports.addUnits = async ctx => {
    let name = ctx.request.body.name;
    let rooms  = ctx.request.body.rooms;
    let jobs  = ctx.request.body.jobs;
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
    for(let i in rooms) {
        await unitModel.insertUnitRoom([unit_id, rooms[i]])
            .then(() => {
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
    }
    for(let i in jobs) {
        await unitModel.insertUnitJob([unit_id, jobs[i]])
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
        await unitModel.deleteUnitRoom([ids[i]])
            .then(() => {
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
        await unitModel.deleteUnitJob([ids[i]])
            .then(() => {
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
        
        await unitModel.deleteUnit([ids[i]])
            .then(() => {
                ctx.body = {
                    code:200,
                    message:'删除成功',
                    data: unDelData
                }
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
    }
}

exports.updateUnits = async ctx => {
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let rooms  = ctx.request.body.rooms;
    let jobs  = ctx.request.body.jobs;
    await unitModel.deleteUnitRoom([id])
        .then(res => {
            // console.log(res)
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
    await unitModel.deleteUnitJob([id])
        .then(res => {
            // console.log(res)
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })
    await unitModel.updateUnit([name, id])
        .then(res => {
            // console.log(res)
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err
            }
        })

    for(let i in rooms) {
        await unitModel.insertUnitRoom([id, rooms[i]])
            .then(res => {
                // console.log(res)
            })
            .catch(err => {
                ctx.body = {
                    code: 500,
                    message: err
                }
            })
    }
    for(let i in jobs) {
        await unitModel.insertUnitJob([id, jobs[i]])
        .then(res => {
            // console.log(res)
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
        message:'修改成功'
    }
}

exports.getUnits = async ctx => {
    let units = []
    await unitModel.findAllUnit()
        .then(res => {
            units = res
        }).catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })
    // 获取 office
    let result = []
    for(let i in units) {
        let jobs = []
        let obj = {
            id: units[i].id,
            name: units[i].name,
            excessive: units[i].excessive
        }
        await unitModel.findJobByUnitId([units[i].id])
            .then(res => {
                jobs = res
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })

        let rooms = []
        await unitModel.findRoomByUnitId([units[i].id])
            .then(res => {
                rooms = res
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
        obj.jobs = jobs
        obj.rooms = rooms
        result.push(obj)
    }
    ctx.body = {
        code: 200,
        message: '查询成功',
        data: result
    }
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

exports.getRoomsByUnitIdAndOfficeId = async ctx => {
    let unit_id = ctx.query.unit_id;
    let office_id = ctx.query.office_id;
    await unitModel.findRoomByUnitIdAndOfficeId([unit_id, office_id])
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
        await userModel.findUserById([user_ids[i]])
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
    let units = []
    let excessive_units = []

    await unitModel.findAllUnit()
        .then(res => {
            for(let i in res) {
                units.push(res[i])
            }
        })
        .catch(err => {
            ctx.body = {
                code: 500,
                message: err,
            }
        })

    for(var i in units) {
        units[i].excessive_rooms = []
        let rooms = []
        await unitModel.findRoomByUnitId(units[i].id)
            .then(res => {
                rooms = res
            })
        
        for(let j = 0; j < rooms.length; j++) {
            let users = []
            let user_area = 0
            await roomModel.findUsersByRoomId([rooms[j].id])
                .then(res => {
                    users = res
                    for(let i in res) {
                        user_area += res[i].job_area
                    }
                }).catch(err => {
                    ctx.body = {
                        code: 500,
                        message: err,
                    }
                })
            if(rooms[j].area < user_area) {
                rooms[j].excessive = 1
                rooms[j].users = users
                units[i].excessive_rooms.push(rooms[j])
            } else {
                rooms[j].excessive = 0
            }
            await roomModel.updateRoomExcessive([rooms[j].excessive, rooms[j].id])
                .then(res => {
                }).catch(err => {
                    ctx.body = {
                        code: 500,
                        message: err,
                    }
                })
        }
        if(units[i].excessive_rooms.length == 0) {
            units[i].excessive = 0
        } else {
            units[i].excessive = 1
            excessive_units.push(units[i])
        }
        await unitModel.updateUnitExcessive([units[i].excessive, units[i].id])
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
        message: '查询成功',
        data: excessive_units
    }
}