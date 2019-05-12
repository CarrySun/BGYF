
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
        await unitModel.insertUnitOffice([unit_id, rooms[i].office_id, rooms[i].room_id])
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
        await unitModel.insertUnitJob([unit_id, jobs[i].id])
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
  await unitModel.updateUnit([name, id])
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
    let rooms = []
    let excessive_list = []
    await roomModel.findAllRoom()
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
        await roomModel.findUsersByRoomId([rooms[k].id])
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
        await roomModel.updateRoomExcessive([rooms[k].excessive, rooms[k].id])
            .then(res => {
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
    }
    let office = {}
    for(let i in rooms) {
        await unitModel.findUnitsByRoom([rooms[i].id])
            .then(res => {
                let unit_id = res[0].unit_id
                let excessive = rooms[i].excessive
                if(office.hasOwnProperty(unit_id)) {
                    if(excessive == 1) {
                        office[unit_id] = 1
                    }
                } else {
                    office[unit_id] = excessive
                }
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
    }
    
    for(var key in office) {
        await unitModel.updateUnitExcessive([office[key], key])
            .then(res => {
            }).catch(err => {
                ctx.body = {
                    code: 500,
                    message: err,
                }
            })
    }

    let units = []
    await unitModel.findExcessive()
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