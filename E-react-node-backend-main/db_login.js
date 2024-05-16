const knex = require('knex');
const dbConfig = require("./app/config/db.config");


const db=knex({
    client: dbConfig.dialect,
    connection: {
      host : dbConfig.HOST,
      port : dbConfig.PORT,
      user : dbConfig.USER,
      password : dbConfig.PASSWORD,
      database : dbConfig.DB
    }
  });

module.exports = db;