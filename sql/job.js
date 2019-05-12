const query = require('../config/mysql.js');
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
  