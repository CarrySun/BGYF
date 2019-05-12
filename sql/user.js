const query = require('../config/mysql.js');

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
    let _sql = `select user.*,unit.name as unit_name,room.name as room_name,job.name as job_name,job.area as job_area, office.name as office_name from user,unit,room,job,office where user.unit_id = unit.id and user.room_id = room.id and user.job_id = job.id and user.office_id = office.id and user.id = ?;`
    return query( _sql, value)
  }