import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../styles/screens/heart-disease.css";
import axios from "axios";

function Heartdiseaseml() {
  const location = useLocation();
  const [diagnosis, setDiagnosis] = useState("");
  const [heartPrediction, setHeartPrediction] = useState(null);
  const [features, setFeatures] = useState([]);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [predictionEmoji, setPredictionEmoji] = useState(''); 

  // Define the order of the features and their display names
  const featureOrder = [
    { apiName: 'id', displayName: 'PatientID' },
    { apiName: 'male', displayName: 'Gender' },
    { apiName: 'age', displayName: 'Age' },
    { apiName: 'education', displayName: 'Education' },
    { apiName: 'currentSmoker', displayName: 'Current Smoker' },
    { apiName: 'cigsPerDay', displayName: 'Cigs Per Day' },
    { apiName: 'BPMeds', displayName: 'BP Medication' },
    { apiName: 'prevalentStroke', displayName: 'Prevalent Stroke' },
    { apiName: 'prevalentHyp', displayName: 'Prevalent Hypertension' },
    { apiName: 'diabetes', displayName: 'Diabetes' },
    { apiName: 'totChol', displayName: 'Cholesterol' },
    { apiName: 'sysBP', displayName: 'Systolic Blood Pressure' },
    { apiName: 'diaBP', displayName: 'Diabolic Blood Pressure' },
    { apiName: 'BMI', displayName: 'BMI' },
    { apiName: 'heartRate', displayName: 'Heart Rate' },
    { apiName: 'glucose', displayName: 'Glucose' },
  ];

  const fetchHeartDiseasePrediction = async () => {
    setHeartPrediction(null); 
    try {
      const phoneNumber = location.state?.MobileNumber; 
      const response = await axios.get(
        `https://heartdiseaseml-varun-fd3507a0de8c.herokuapp.com/predict/phone/${phoneNumber}`
      );
      const { data } = response;
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        setHeartPrediction(data.prediction);
        
        setPredictionEmoji(data.prediction === "The patient will not develop heart disease." ? '🙂' : '🙁');

        
        const orderedFeatures = featureOrder.map(({ apiName, displayName }) => {
          let value = data.features[apiName];
          // Special handling for gender
          if (apiName === 'male') {
            value = value === 1 ? 'Male' : 'Female';
          }
          return {
            key: displayName,
            value: value,
          };
        });

        setFeatures(orderedFeatures); 
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHeartPrediction({ error: "Record does not exist" });
      } else {
        setHeartPrediction({ error: `An unexpected error occurred: ${error.message}` });
      }
    }
  };

  const togglePatientDetails = () => {
    setShowPatientDetails(!showPatientDetails); // Toggle the visibility of patient details
  };

  return (
    <>
      <Helmet>
        <title>Heart Disease Prediction</title>
      </Helmet>
      <center>
        <div className="heart-disease-container">
          <strong>Diagnosis:</strong> {diagnosis}
          <br />
          <button onClick={fetchHeartDiseasePrediction}>
            Get Heart Disease Result
          </button>
          {heartPrediction && !heartPrediction.error && (
            <div className="response-container">
              <strong>Heart Disease Prediction:</strong> {heartPrediction} {predictionEmoji}
              <br />
              <div className="show-details-container">
              <button onClick={togglePatientDetails}>
                {showPatientDetails ? "Hide Patient Details" : "Show Patient Details"}
              </button>
              </div>
            </div>
          )}
          {heartPrediction && heartPrediction.error && (
            <div>
              <strong>Error:</strong> {heartPrediction.error}
            </div>
          )}
          {showPatientDetails && features && features.length > 0 && (
            <table>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index}>
                    <th>{feature.key}</th>
                    <td>{feature.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </center>
    </>
  );
}

export default Heartdiseaseml;
