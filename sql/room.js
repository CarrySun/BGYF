const query = require('../config/mysql.js');

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
    let _sql = `select user.*,job.area as job_area,job.name as job_name from user left join job on job.id=user.job_id where user.room_id = ?;`
    return query( _sql, value)
  }
  