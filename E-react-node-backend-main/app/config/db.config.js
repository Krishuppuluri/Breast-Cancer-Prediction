// config/db.config.js
module.exports = {
  connectionString: "mysql://j6qbx3bgjysst4jr:mcbsdk2s27ldf37t@frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/nkw2tiuvgv6ufu1z",
  HOST: "frwahxxknm9kwy6c.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  USER: "j6qbx3bgjysst4jr",
  PASSWORD: "mcbsdk2s27ldf37t",
  DB: "nkw2tiuvgv6ufu1z",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 300,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
