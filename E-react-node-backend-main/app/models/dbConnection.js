const mysql = require('mysql');
const dbConfig = require("../config/db.config");
var db;
module.exports = {
  // This method return connected db obejct.
  connect: function () {
    db = mysql.createConnection(dbConfig.connectionString);
    db.connect(function(err) {
      if (err) {
        console.log(console.error('error: ' + err.message));
        return false;
      }
  
      // console.log('Connected to the MySQL server.');
      return true;
    });
    return db;
  },
  // This method execute query based on existing connection
  queryWithDB: function(query, db) {
    let result = new Promise( ( resolve, reject ) => {
      db.query(query, (err, result)=>{
        if (err){
          return reject( err );
        }
        resolve( result );
      });
    })
    return result;
  },
  // This method establishes a one-time connection for the input query.
  query: function(query) {
    let conn = mysql.createConnection('mysql://j6qbx3bgjysst4jr:mcbsdk2s27ldf37t@frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/nkw2tiuvgv6ufu1z');
    conn.connect(function(err) {
      if (err) {
        console.log(console.error('error: ' + err.message));
        return false;
      }
  
      // console.log('Connected to the MySQL server.');
      return true;
    });

    let result = new Promise( ( resolve, reject ) => {
      conn.query(query, (err, result)=>{
        if (err){
          return reject( err );
        }
        resolve( result );
      });
    })
    conn.end();
    return result;
  }
};