const addPatientInfoAction = (patientInfo) => {
  return {
    type: "ADD_PATIENT_INFO",
    payload: patientInfo,
  };
};

export default addPatientInfoAction;
