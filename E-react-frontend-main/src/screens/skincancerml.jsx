import {useLocation} from 'react-router-dom';
import {Helmet} from "react-helmet";
import '../styles/screens/diagonostic.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Skincancerml() {

    const location = useLocation();
  //console.log(location.state.MobileNumber);
  const [recordList, setRecordList] = useState([]);
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    // Function to retrieve patient records
    const getPatientRecords = async () => {
      try {
       // const searchParams = new URLSearchParams(window.location.search);
        //const phoneNumber = searchParams.get('phoneNumber');

        const phoneNumber =location.state.MobileNumber;
        console.log("parm found ",phoneNumber);
      //local backend api link (http://localhost:8080/imageRetrieveByPhoneNumber)
        const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/imageRetrieveByPhoneNumber', {
          phoneNumber,
          recordType: 'Skin_Images',
        });

        const { data } = response;
        if (data.error) {
          alert(JSON.stringify(data.error));
        } else {
          setRecordList(data.success);
        }
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

    getPatientRecords();
  }, []);

  // Function to send the image for prediction
  const predict = async (index) => {
    const record = recordList[index];
    try {
      const imageBlob = await fetch(`data:image/jpeg;base64,${record.file.buffer}`).then((response) =>
        response.blob()
      );
      const formData = new FormData();
      formData.append('file', imageBlob, record.file.originalname);
      //skincancer ml model api link deployed on heroku via git
      const response = await axios.post('https://skincancerml-1f755bd41b5d.herokuapp.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { data } = response;
      if (data.error) {
        alert(JSON.stringify(data.error));
      } else {
        storePrediction(data, record._id);
        const diagnosisMessage = data.message || 'No diagnosis available';
        setDiagnosis(diagnosisMessage);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Function to store the prediction result
  const storePrediction = async (result, id) => {
    try {
     // const searchParams = new URLSearchParams(window.location.search);
     // const phoneNumber = searchParams.get('phoneNumber');
     const phoneNumber =location.state.MobileNumber;
      const today = new Date().toISOString();
      const offset = new Date().getTimezoneOffset();

      const variable = result.message === 'Cancer' ? 1 : 0;
      //local backend api link (http://localhost:8080/updateDisease)
      const response = await axios.post('https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease', {
        phoneNumber,
        disease: 'cancers',
        date: today,
        prediction: variable,
        description: 'Skin Cancer',
        accuracy: result.accuracy || null,
        recordType: 'Skin_Images',
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
            <br/>   <br/>   <br/>   <br/>
   <center> <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Record Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recordList.map((record, index) => (
            <tr key={record._id}>
              <td>
                <img src={`data:image/jpeg;base64,${record.file.buffer}`} alt="Skin Image" width="150" height="150" />
              </td>
              <td>{record.RecordDate}</td>
              <td>
                <button onClick={() => predict(index)}>Diagnose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <br/>
      <div>
        <strong>Diagnosis:</strong> {diagnosis}
      </div>
    </div></center>   <br/>   <br/>   <br/>   <br/>   <br/>

            </>
        )
    }

    export default Skincancerml;