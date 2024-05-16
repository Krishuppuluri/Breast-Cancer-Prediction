import { useLocation } from 'react-router-dom';
import '../styles/screens/diagonostic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BreastCancerPredictionML() {

  const location = useLocation();
  const [prediction, setPrediction] = useState('');
  const patient_id = location.state.id;
  const BASE_URL = 'https://e-react-node-backend-22ed6864d5f3.herokuapp.com'; // Update with your node backend app URL
  //const BASE_URL = 'http://localhost:8080'; // Update with your node backend app URL

  useEffect(() => {
    // Function to retrieve breast cancer data
    const getBreastCancerData = async () => {
      try {
        console.log("patient found ", patient_id);
        const response = await axios.post(`${BASE_URL}/getBreastCancerData`, {
          patient_id,
        });
        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
        } else {
          delete data.id;
          delete data.patient_id;
          console.log(data)
          const responsePrediction = await axios.post(`https://rs-breast-cancer-b796083862f3.herokuapp.com/predict`, data, {
            headers: {
              'Content-Type': 'application/json', // Important: Set the content type to form data
            },
          });
          console.log(responsePrediction.data)
          setPrediction(responsePrediction.data);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    getBreastCancerData();
  }, [patient_id]);

  return (
    <>
      {JSON.stringify(prediction)}
    </>
  )
}

export default BreastCancerPredictionML;



