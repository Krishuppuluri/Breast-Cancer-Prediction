import axios from 'axios';



//Syed's API imageRetrieveByPhoneNumber
export const getPatientRecords = async (phoneNumber, typeOfRecord) => {
  try {
    const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/imageRetrieveByPhoneNumber', {
      phoneNumber,
      recordType: typeOfRecord,
    });
    const { data } = response;

    if (data.error) {
      alert(JSON.stringify(data.error));
    } else {
      return data.success;
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
    return [];
  }
};
//Syed's API StorePrediction
export const storePredictionAPI = async (phoneNumber, disease, prediction, accuracy, recordType, recordId, variable) => {
  try {
    const today = new Date().toISOString();

    const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease', {
      phoneNumber,
      disease,
      date: today,
      prediction: variable,
      description: prediction,
      accuracy: accuracy || null,
      recordType,
      recordId: recordId || null,
    });

    const { data } = response;

    if (data.error) {
      alert(JSON.stringify(data.error));
    } else {
      alert(data.success + " Diagnosis has been stored");
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};




