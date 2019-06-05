const query = require('../config/mysql.js');

/* 
  单位 增删改查
*/

exports.insertUnit = ( value ) => {
  let _sql = "insert into unit set name=?;"
  return query( _sql, value )
}

exports.insertUnitRoom = ( value ) => {
  let _sql = "update room set unit_id=? where id = ?;"
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

exports.deleteUnitRoom = ( value ) => {
  let _sql = `update room set unit_id = null where unit_id = ?;`
  return query( _sql, value)
}

exports.deleteUnitJob = ( value ) => {
  let _sql = `delete from unit_job where unit_id=?;`
  return query( _sql, value)
}

exports.updateUnit = ( value ) => {
  let _sql = `update unit set name=? where id=?;`
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
  let _sql = `select office.id as office_id, office.name as office_name,room.* from room left join office on room.office_id=office.id where unit_id = ?`
  return query( _sql, value)
}

exports.findJobByUnitId = (value) => {
  let _sql = `select job.id as id, job.name as name, job.area as area from unit_job left join job on unit_job.job_id=job.id where unit_id = ?;`
  return query( _sql, value)
}

exports.findOfficeByUnitId = (value) => {
  let _sql = `select office.id as id, office.name as name from room left join office on room.office_id=office.id where room.unit_id = ? group by office.id;`
  return query( _sql, value)
}

exports.findRoomByUnitIdAndOfficeId = (value) => {
  let _sql = `select * from room where unit_id = ? and office_id = ?;`
  return query( _sql, value)
}

exports.findUsersByUnitId = (value) => {
  let _sql = `select * from user where unit_id = ?;`
  return query( _sql, value)
}