const query = require('../config/mysql.js');

/* 
  单位 增删改查
*/

exports.insertUnit = ( value ) => {
  let _sql = "insert into unit set name=?;"
  return query( _sql, value )
}

exports.insertUnitOffice = ( value ) => {
  let _sql = "insert into unit_room set unit_id=?,office_id=?,room_id=?;"
  return query( _sql, value )
}

exports.insertUnitJob = ( value ) => {
  let _sql = "insert into unit_job set unit_id=?,job_id=?;"
  return query( _sql, value )
}

exports.deleteUnit = ( value ) => {
  let _sql = `delete from unit where id=?;`
  return query( _sql, value)
}

exports.updateUnit = ( value ) => {
  let _sql = `update unit set name=? where id=?;`
  return query( _sql, value )
}

exports.findUnitsByRoom = (value) => {
  let _sql = `select * from unit_room where room_id = ?;`
  return query( _sql, value )
}

exports.updateUnitExcessive = ( value ) => {
  let _sql = `update unit set excessive=? where id = ?`
  return query( _sql, value )
}

exports.findAllUnit =  () => {
  let _sql = `select * from unit;`
  return query( _sql)
}
exports.findExcessive = () => {
  let _sql = `select * from unit where excessive = 1;`
  return query( _sql)
}

exports.findUnitById =  (value) => {
  let _sql = `select * from unit where id = ?;`
  return query( _sql, value)
}


exports.findRoomByUnitId = (value) => {
  let _sql = `select office.id as office_id, office.name as office_name,room.id as room_id, room.name as room_name from unit_room left join office on unit_room.office_id=office.id left join room on unit_room.room_id=room.id where unit_room.unit_id = ?;`
  return query( _sql, value)
}

exports.findJobByUnitId = (value) => {
  let _sql = `select job.id as id, job.name as name, job.area as area from unit_job left join job on unit_job.job_id=job.id where unit_id = ?;`
  return query( _sql, value)
}

exports.findOfficeByUnitId = (value) => {
  let _sql = `select office.id as id, office.name as name from unit_room left join office on unit_room.office_id=office.id where unit_room.unit_id = ? group by office.id;`
  return query( _sql, value)
}

exports.findRoomByUnitIdAndOfficeId = (value) => {
  let _sql = `select room.id as id, room.name as name from unit_room left join room on unit_room.room_id=room.id where unit_room.unit_id = ? and unit_room.office_id = ?;`
  return query( _sql, value)
}

exports.findUsersByUnitId = (value) => {
  let _sql = `select * from user where unit_id = ?;`
  return query( _sql, value)
}