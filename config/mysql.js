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
      name VARCHAR(100) NOT NULL COMMENT '单位名称',
      excessive INT default 0 COMMENT '超标'
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


let room =
    `create table if not exists room (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL COMMENT '房间名称',
      area float(5,2) DEFAULT NULL COMMENT '面积',
      excessive INT default 0 COMMENT '超标',
      office_id INT,
      unit_id INT,
      foreign key(office_id) references office(id)
    ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;`

let unit_job =
    `create table if not exists unit_job(
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      unit_id INT NOT NULL COMMENT '单位id',
      job_id INT NOT NULL COMMENT '岗位id',
      foreign key(unit_id) references unit(id),
      foreign key(job_id) references job(id)
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
createTable(room)
createTable(unit_job)
createTable(user)

module.exports = query