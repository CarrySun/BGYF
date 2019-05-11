var mysql = require('mysql');
var config = require('../config/default.js')

var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});

let query = ( sql, values ) => {

  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}

let unit =
    `create table if not exists unit(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL COMMENT '单位名称'
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`

let job =
    `create table if not exists job(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL COMMENT '岗位名称',
      area float(5,2) DEFAULT NULL COMMENT '办公用房面积'
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`

let office =
    `create table if not exists office(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL COMMENT '办公楼名称'
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`
    
let unit_job =
    `create table if not exists unit_job(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      unit_id INT NOT NULL COMMENT '单位id',
      job_id INT NOT NULL COMMENT '岗位id',
      foreign key(unit_id) references unit(id),
      foreign key(job_id) references job(id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`

let unit_office =
    `create table if not exists unit_office(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      unit_id INT NOT NULL COMMENT '单位id',
      office_id INT NOT NULL COMMENT '办公楼id',
      foreign key(unit_id) references unit(id),
      foreign key(office_id) references office(id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`


let room =
    `create table if not exists room(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL COMMENT '房间名称',
      area float(5,2) DEFAULT NULL COMMENT '面积',
      office_id INT,
      excessive INT default 0 COMMENT '超标',
      foreign key(office_id) references office(id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`

let user =
    `create table if not exists user(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL COMMENT '姓名',
      sex VARCHAR(100) NOT NULL COMMENT '性别',
      phone VARCHAR(100) NOT NULL COMMENT '联系电话',
      unit_id INT,
      office_id INT,
      room_id INT,
      job_id INT,
      foreign key(unit_id) references unit(id),
      foreign key(office_id) references office(id),
      foreign key(room_id) references room(id),
      foreign key(job_id) references job(id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`

let createTable = ( sql ) => {
  return query( sql, [] )
}

// 建表
createTable(unit)
createTable(job)
createTable(office)
createTable(unit_job)
createTable(unit_office)
createTable(room)
createTable(user)

/* 
  单位 增删改查
*/
exports.insertUnit = ( value ) => {
  let _sql = "insert into unit set name=?;"
  return query( _sql, value )
}

exports.deleteUnit = ( value ) => {
  let _sql = `delete from unit where id=?;`
  return query( _sql, value)
}

exports.updateUnit = ( value ) => {
  let _sql = "update unit set name=? where id=?;"
  return query( _sql, value )
}


exports.updateUnitExcessive = ( value ) => {
  let _sql = "update unit set excessive=? where id=?;"
  return query( _sql, value )
}

exports.findAllUnit =  () => {
  let _sql = `select * from unit;`
  return query( _sql)
}

exports.findUnitById =  (value) => {
  let _sql = `select * from unit where id = ?;`
  return query( _sql, value)
}

exports.insertUnitOffice = ( value ) => {
  let _sql = "insert into unit_office set unit_id=?,office_id=?;"
  return query( _sql, value )
}

exports.insertUnitJob = ( value ) => {
  let _sql = "insert into unit_job set unit_id=?,job_id=?;"
  return query( _sql, value )
}


exports.findOfficeByUnitId = (value) => {
  let _sql = `select office.id as id, office.name as name from unit_office left join office on unit_office.office_id=office.id where unit_id = ?;`
  return query( _sql, value)
}

exports.findJobByUnitId = (value) => {
  let _sql = `select job.id as id, job.name as name, job.area as area from unit_job left join job on unit_job.job_id=job.id where unit_id = ?;`
  return query( _sql, value)
}

exports.findUsersByUnitId = (value) => {
  let _sql = `select * from user where unit_id = ?;`
  return query( _sql, value)
}

/* 
  岗位 增删改查
*/

exports.insertJob = ( value ) => {
  let _sql = "insert into job set name=?,area=?;"
  return query( _sql, value )
}

exports.deleteJob = ( value ) => {
  let _sql = `delete from job where id=?;`
  return query( _sql, value )
}

exports.updateJob = ( value ) => {
  let _sql = "update job set name=?,area=? where id=?;"
  return query( _sql, value )
}

exports.findAllJob =  () => {
  let _sql = `select * from job;`
  return query( _sql)
}
exports.findJobById =  (value) => {
  let _sql = `select * from job where id = ?;`
  return query( _sql, value)
}

/* 
  办公楼增删改查
*/

exports.insertOffice = ( value ) => {
  let _sql = "insert into office set name=?;"
  return query( _sql, value )
}

exports.deleteOffice = ( value ) => {
  let _sql = `delete from office where id=?;`
  return query( _sql, value )
}

exports.updateOffice = ( value ) => {
  let _sql = "update office set name=? where id=?;"
  return query( _sql, value )
}

exports.findAllOffice =  () => {
  let _sql = `select * from office;`
  return query( _sql)
}
exports.findOfficeById =  (value) => {
  let _sql = `select * from office where id = ?;`
  return query( _sql, value)
}
exports.findUnitsByOffice = (value) => {
  let _sql = `select unit.id as id, unit.name as name from unit_office left join unit on unit_office.unit_id=unit.id where office_id = ?;`
  return query( _sql, value)
}


exports.findRoomsByOffice = (value) => {
  let _sql = `select * from room where office_id = ?`
  return query( _sql, value)
}
/* 
  房间增删改查
*/

exports.insertRoom = ( value ) => {
  let _sql = "insert into room set name=?,area=?,office_id=?;"
  return query( _sql, value )
}

exports.deleteRoom = ( value ) => {
  let _sql = `delete from room where id=?;`
  return query( _sql, value )
}

exports.updateRoom = ( value ) => {
  let _sql = "update room set name=?,area=?,office_id=? where id=?;"
  return query( _sql, value )
}

exports.updateRoomExcessive = ( value ) => {
  let _sql = "update room set excessive=? where id=?;"
  return query( _sql, value )
}

exports.findAllRoom =  () => {
  let _sql = `select * from room;`
  return query( _sql)
}

exports.findRoomById =  (value) => {
  let _sql = `select * from room where id = ?;`
  return query( _sql, value)
}



exports.findUsersByRoomId =  (value) => {
  let _sql = `select user.*,job.area as job_area from user left join job on job.id=user.job_id where user.room_id = ?;`
  return query( _sql, value)
}


exports.findUnitByExcessiveRoom = (value) => {
  let _sql = `select * from room left join unit_office on unit_office.office_id=room.office_id where room.excessive = 1;`
  return query( _sql, value)
}

/* 
  用户增删改查
*/

exports.insertUser = ( value ) => {
  let _sql = "insert into user set name=?,sex=?,phone=?,unit_id=?,office_id=?,room_id=?,job_id=?;"
  return query( _sql, value )
}

exports.deleteUser = ( value ) => {
  let _sql = `delete from user where id=?;`
  return query( _sql, value )
}

exports.updateUser = ( value ) => {
  let _sql = "update user set name=?,sex=?,phone=?,unit_id=?,office_id=?,room_id=?,job_id=? where id=?;"
  return query( _sql, value )
}

exports.findAllUser =  () => {
  let _sql = `select user.*,unit.name as unit_name,room.name as room_name,job.name as job_name,job.area as job_area, office.name as office_name from user,unit,room,job,office where user.unit_id = unit.id and user.room_id = room.id and user.job_id = job.id and user.office_id = office.id`
  return query( _sql)
}

exports.findUserById = (value) => {
  let _sql = `select user.*,unit.name as unit_name,room.name as room_name,job.name as job_name,job.area as job_area, office.name as office_name from user,unit,room,job where user.unit_id = unit.id and user.room_id = room.id and user.job_id = job.id and user.office_id = office.id and user.id = ?;`
  return query( _sql, value)
}