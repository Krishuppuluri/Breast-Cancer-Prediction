import {useLocation} from 'react-router-dom';
import '../styles/screens/Thyroid.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ThyroidML() {
  const location = useLocation();
  const [latestRecord, setLatestRecord] = useState();
  const [tableOfData, setTableOfData] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');
  const patientId = location.state.id;
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const titlesOfData = [
    "age", "sex", "TSH", "T3", "T4U", "FTI", "onthyroxine", "queryonthyroxine",
    "onantithyroidmedication", "sick", "pregnant", "thyroidsurgery", "I131treatment",
    "queryhypothyroid", "queryhyperthyroid", "lithium", "goitre", "tumor",
    "hypopituitary", "psych", "result"
  ];



  useEffect(() => {
    // Check if patientId is available
    if (!patientId) {
        alert("No patient ID provided.");
        return; // Exit from the useEffect to avoid further execution
    }

    const getPatientLatestRecord = async () => {
        try {
            // const response = await axios.post('http://localhost:8080/getThyroidDiseaseData', {
            //     patientId
            // });
            const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/getThyroidDiseaseData', {
                patientId
            });
            const { data } = response;

            if (data.error) {
                alert(JSON.stringify(data.error));
            } else if (!data || !data.data) { // Check if data or data.data is not available
                alert("Received wrong result from the server.");
            } else {
                setLatestRecord(data);
                setTableOfData(Object.values(data.data));
            }
        } catch (error) {
            console.log(`Error With request on patient records: ${error.message}`);
            alert(`An error occurred: ${error.message}`);
        }
    };

    getPatientLatestRecord();
}, [patientId]);


  // Assuming a predict function and storePrediction function to be updated accordingly...
  // Function to send the thyroid data for prediction
  const predict = async (recordTest) => {
    const record = recordTest.latestRecord.data;

    console.log("record",record);
    try {
      const response = await axios.post('https://thyroid-api-830c8b828570.herokuapp.com/predict', record, {
        headers: { 'Content-Type': 'application/json' },
      });

      const result = response.data;
      console.log("res",response);

      if (result.error) {
        alert(JSON.stringify(result.error));
      } else {
        setDiagnosis(result);
        setAlertMessage('Successfully stored in db'); // Set the success message
        setShowAlert(true); // Show the alert
        // Hide the alert after 3 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    } catch (error) {
      //alert(`Error: ${error.message}`);
      setAlertMessage(`Error: ${error.message}`);
      setShowAlert(true); // Show the alert
      // Optionally hide the alert after some time
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  
  
  return (
    <>
      {/* <center>
        <div>
          <h2>Latest Thyroid Test Results</h2>
          <button onClick={() => predict({latestRecord})}>Diagnose</button>
          <div>
            <strong>Diagnosis:</strong> {diagnosis}
          </div>
          <hr/>
          <table>
            <thead>
              <tr>
                <th>Variables</th>
                <th>Record Date</th>
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
      </center> */}
        <div className="thyroid-container">
            <h2 className="title"> Thyroid Disease Results</h2>
            <button className="diagnose-button" onClick={() => predict({ latestRecord })}>Diagnose</button>
            <div className="diagnosis-result">
                <strong>Diagnosis:</strong> {diagnosis}
            </div>
            {showAlert && (
                <div className="alert-success">
                  {alertMessage}
                </div>
              )}
            <table className="results-table">
                <thead>
                    <tr>
                        <th>Variables</th>
                        <th>Record Date</th>
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

export default ThyroidML;
