import {useLocation} from 'react-router-dom';
import '../styles/screens/Liver.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const titlesOfData = [
  "Age", "Total_Bilirubin", "Direct_Bilirubin", "Alkaline_Phosphotase", "Alamine_Aminotransferase",
  "Aspartate_Aminotransferase", "Total_Protiens", "Albumin", "Albumin_and_Globulin_Ratio", "Gender_Female",
  "Gender_male"
];

function Liver_disease_ML() {
  const [prediction, setPrediction] = useState(null);
  const location = useLocation();
  const phoneNumber =location.state.MobileNumber;
  const [latestRecord, setLatestRecord] = useState();
  const [tableOfData, setTableOfData] = useState([]);
  const patientId =location.state.id;
  const fname = location.state.FName
  const lname = location.state.LName

  useEffect(() => {
    // Function to retrieve patient records
    const getPatientLatestRecord= async () => {
      try {
        console.log("parm found ",phoneNumber);
        //http://localhost:8080/liver_disease -- get liver disease related data/parameters
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/liver_disease', {
          patientId
        });

        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
          console.log("error ")
        } else {
          setLatestRecord(data);
          setTableOfData(data.data)
          console.log("data", data)
          console.log("latestRecord", latestRecord)
        }
      } catch (error) {
        console.log(`Error With request on patient records: ${error.message}`);
      }
    };

    getPatientLatestRecord();
  }, [patientId]);

  // Function to send the ckd for prediction
  const predict = async (recordTest) => {
    const record = latestRecord;
    console.log("latestRecord", latestRecord)
    console.log("Here I am supposed to get record")
    console.log(record.data)

    //convert the data in array to dict. in order for ML api to read it.
    const dict_data = {
      Age: record.data[0], 
      Total_Bilirubin: record.data[1], 
      Direct_Bilirubin: record.data[2], 
      Alkaline_Phosphotase: record.data[3], 
      Alamine_Aminotransferase: record.data[4], 
      Aspartate_Aminotransferase: record.data[5], 
      Total_Protiens: record.data[6], 
      Albumin: record.data[7], 
      Albumin_and_Globulin_Ratio: record.data[8], 
      Gender_Female: record.data[9], 
      Gender_Male: record.data[10]
    }
      //https://livermodelpk1-6b1f7b50410e.herokuapp.com/ -- https://livermlpk-fbdfa9329507.herokuapp.com/predict
    try {
      const response = await axios.post('https://livermlpk-fbdfa9329507.herokuapp.com/predict', dict_data, {
        headers: { 'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
      });

      const { data } = response;
      console.log(data);
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        storePrediction(data, record.record_id);
        setPrediction(response.data.prediction === 1 ? 'High potential of chronic liver failure' : 'Lower chances of chronic liver failure');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Function calls NodeJS api to update the ML prediction result in the database
  const storePrediction = async (result, id) => {
    try {
      const today = new Date().toISOString();
      const prediction = result.prediction
      const variable = prediction === 1 ? 1 : 0;

      //local backend api link (http://localhost:8080/updateDisease )
      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease', {
        phoneNumber,
        disease: 'liver_diseases',
        date: today,
        prediction: variable,
        description: 'No Liver Disease',
        accuracy: null,
        recordType: 'Liver enzymes test',
        recordId: id || null,
      });

      const { data } = response;
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        alert(data.success);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
        <div className="liver-container">
            <h2 className="liver-title"> {fname} {lname} - Liver disease results</h2>
            <button className="liver-diagnose-button" onClick={() => predict({ latestRecord })}>Diagnose</button>
            <div className="liver-diagnosis-result">
                <strong>Diagnosis:</strong> {prediction}
            </div>
            <table className="liver-results-table">
                <thead>
                    <tr>
                        <th>Variables</th>
                        <th>Record</th>
                    </tr>
                </thead>
                <tbody>
                    {tableOfData.map((value, index) => (
                        <tr key={index}>
                            <td>{titlesOfData[index]}</td>
                            <td>{value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  );
}

export default Liver_disease_ML;