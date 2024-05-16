
const dbConfig = require("../../app/config/db.config");

const db = require("../../db");
const { QueryTypes } = require("sequelize");

exports.getAllUsers = async (req, res) => {
  try {
    const tables = await db.sequelize.query(
      "SHOW TABLES",
      { type: QueryTypes.SHOWTABLES, database: dbConfig.DB }
    );
    //console.log("tables:", tables);
    res.json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPatients = async (req, res) => {
  console.log("pateints")

  try {
    const patients = await db.sequelize.query(
      "SELECT * FROM nkw2tiuvgv6ufu1z.patients_registration",
      { type: QueryTypes.SELECT }
    );
    //console.log("pateints",patients)
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



