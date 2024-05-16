
const dbConfig = require("../config/db.config");

const db = require("../../db");
const { QueryTypes } = require("sequelize");

exports.getAllSpecialities = async (req, res) => {
  try {
    const specialities = await db.sequelize.query(
      "SELECT * FROM " + dbConfig.DB +".specialities where status = '1'",
      { type: QueryTypes.SELECT}
    );
    res.json(specialities);
  } catch (error) {
    console.error("Error fetching specialities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};