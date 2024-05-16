import { useLocation } from 'react-router-dom';
import '../styles/screens/BreastCancer.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BreastCancerML() {
  const [showDiagnose,setShowDiagnose]=useState(false)
  const [data,setData]=useState({})
  const location = useLocation();
  const [prediction, setPrediction] = useState('');
  const patient_id = location.state?.id;
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
        setData(data)
        if (data.error) {
          console.log(JSON.stringify(data.error));
        } else {
          delete data.id;
          delete data.patient_id;
          console.log(data)
          const responsePrediction = await axios.post(`https://breastcancerml-717ef42b90b4.herokuapp.com/predict`, data, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important: Set the content type to form data
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
      <div className="bc-container">
            <h2 className="title"> Breast Cancer Prediction Results</h2>
            <div className="diagnosis-result">
                <strong>Diagnosis:</strong> 
            </div>
            
            <table className="results-tablea">
                <thead>
                    <tr>
                        <th>Parameters</th>
                        <th>Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>Area Mean</td>
                      <td>{data.area_mean}</td>
                    </tr>
                    
                    <tr>
                      <td>Area Se</td>
                      <td>{data.area_se}</td>
                    </tr>
                    
                    <tr>
                      <td>Concavity Mean</td>
                      <td>{data.concavity_mean}</td>
                    </tr>
                    
                    <tr>
                      <td>Concavity Se</td>
                      <td>{data.concavity_se}</td>
                    </tr>
                    
                    <tr>
                      <td>Concavity Worst</td>
                      <td>{data.concavity_worst}</td>
                    </tr>
                    
                    <tr>
                      <td>Fractal Dimension Se</td>
                      <td>{data.fractal_dimension_se}</td>
                    </tr>
                    
                    <tr>
                      <td>Fractal Dimension Worst</td>
                      <td>{data.fractal_dimension_worst}</td>
                    </tr>

                    <tr>
                      <td>Smoothness Worst</td>
                      <td>{data.smoothness_worst}</td>
                    </tr>
                    
                    <tr>
                      <td>Symmetry Worst</td>
                      <td>{data.symmetry_worst}</td>
                    </tr>
                    
                    <tr>
                      <td>Texture Mean</td>
                      <td>{data.texture_mean}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <center>
              <button onClick={()=>setShowDiagnose(!showDiagnose)}>Diagnose</button>
              <br /><br /><br />
              {
                (showDiagnose)?`${prediction}`:''
              }
            </center> 
            <br />
        </div>


    </>
  )
}

export default BreastCancerML;



