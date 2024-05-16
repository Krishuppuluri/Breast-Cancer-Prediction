const addPatientInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_PATIENT_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default addPatientInfoReducer;
