
module.exports = (sequelize, Sequelize) => {
  const PatientsRegistration = sequelize.define("patients_registration", {
    FName: {
      type: Sequelize.STRING,
    },
    MName: {
      type: Sequelize.STRING,
    },
    LName: {
      type: Sequelize.STRING,
    },
    Age: {
      type: Sequelize.INTEGER,
    },
    // Define other fields here
  });
  return PatientsRegistration;
};
