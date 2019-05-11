const query = require('../config/mysql.js');

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

exports.findRoomsByOffice = (value) => {
  let _sql = `select * from room where office_id = ?`
  return query( _sql, value)
}