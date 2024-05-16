import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import annyang from 'annyang';
import axios from 'axios';
import "../styles/screens/VoiceRecoginition.css";
 
const VoiceRecognition = () => {
  const location = useLocation();
  const patientId = new URLSearchParams(location.search).get('patientID');
  const [transcript, setTranscript] = useState('Start speaking...');
  const [recordImage, setRecordImage] = useState({});
 
  const fetchFiles = async (patientId) => {
    try {
      //local backend api link (http://localhost:8080/files/${patientId}
      const response = await axios.get(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/${patientId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
     
      if (response.status === 200) {
        const responseData = response.data;
        console.log('Data sent to backend successfully:', responseData);
        // Handle the response or update the UI as needed
      } else {
        console.error('Failed to send data to backend. HTTP status:', response.status);
        // Log the error response for debugging
        console.error('Error Response:', response.data);
      }
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
 
  const speak = (message) => {
    console.log('Speaking:', message);
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.volume = 1;
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  };
 
  const setupAnnyang = () => {
    if (annyang) {
      annyang.addCommands({
        'hey lava': () => {
          const finalText = 'Hello doc, how can I help you?';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
        },
        'HOW ARE YOU': () => {
          const finalText = 'I am fine doc, what about you?';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
        },
        'name': () => {
          const finalText = 'My name is Lava';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
        },
 
        'open echo report': () => {
          const finalText = 'Opening echo report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          //openFile(`http://localhost:8080/files/echocardiogram/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/echocardiogram/${patientId}`);
        },
       
        'open ultrasound scan': () => {
          const finalText = 'Opening ultrasound scan';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
         // openFile(`http://localhost:8080/files/ultrasoundabdomen/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/ultrasoundabdomen/${patientId}`);
 
        },
        'open ct scan': () => {
          const finalText = 'Opening CT scan';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
         // openFile(`http://localhost:8080/files/ctscan/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/ctscan/${patientId}`);
        },
        'open ecg report': () => {
          const finalText = 'Opening ECG report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          //openFile(`http://localhost:8080/files/ecgreport/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/ecgreport/${patientId}`);
   
        },
        'open blood test report': () => {
          const finalText = 'Opening blood test report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
         // openFile(`http://localhost:8080/files/bloodtest/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/bloodtest/${patientId}`);
        },
        'open x-ray report': () => {
          const finalText = 'Opening X-ray report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
         // openFile(`http://localhost:8080/files/xrayreport/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/xrayreport/${patientId}`);
 
         },
        'open mri report': () => {
          const finalText = 'Opening MRI report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          //openFile(`http://localhost:8080/files/mrireport/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/mrireport/${patientId}`);
        },
        'open endoscope report': () => {
          const finalText = 'Opening endoscope report';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          //openFile(`http://localhost:8080/files/endoscope/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/endoscope/${patientId}`);
        },
        'open cell images': () => {
          const finalText = 'Opening cellimages';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          //openFile(`http://localhost:8080/files/cellimages/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/cellimages/${patientId}`);
 
        },
        'open template': () => {
          const finalText = 'Opening template';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
         // openFile(`http://localhost:8080/files/template/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/template/${patientId}`);
        },
        'open skinimages': () => {
          const finalText = 'Opening skinimages';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
         // openFile(`http://localhost:8080/files/skinimages/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/skinimages/${patientId}`);
 
        },
        'open skindiseases': () => {
          const finalText = 'Opening skindiseases';
          setTranscript(finalText);
          setTimeout(() => speakThis(finalText), 100);
          //openFile(`http://localhost:8080/files/skindiseases/${patientId}`);
          openFile(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/files/skindiseases/${patientId}`);
        },
      });
 
      annyang.setLanguage('en-US');
      annyang.start();
    }
  };
 
  const wishMe = () => {
    var day = new Date();
    var hr = day.getHours();
 
    if (hr >= 0 && hr < 12) {
      speak("Good Morning Boss");
    } else if (hr === 12) {
      speak("Good noon Boss");
    } else if (hr > 12 && hr <= 17) {
      speak("Good Afternoon Boss");
    } else {
      speak("Good Evening Boss");
    }
  };
 
   const openFile = (url) => {
   axios
      .get(url)
      .then((response) => {
        console.log("Response data:", response.data);
        setRecordImage(response.data);
        const imageUrl = `data:${response.data.mimetype};base64,${response.data.data}`;
        const newWindow = window.open();
        newWindow.document.write(`<img src="${imageUrl}" alt="Record Image" />`);
      })
      .catch((error) => {
        console.error('Error opening file:', error);
        console.log('Response data:', error.response.data);
        alert('An error occurred while opening the file. Please try again later.');
      });
     
  };
 
  const speakThis = (message) => {
    console.log('Speaking:', message);
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.volume = 1;
      speech.pitch = 1;
      speech.rate = 1;
      window.speechSynthesis.speak(speech);
    }
  };
 
  useEffect(() => {
    if (patientId) {
      fetchFiles(patientId);
    }
 
    wishMe();
    setupAnnyang();
 
    return () => {
      annyang.abort();
    };
  }, [patientId]);
 
  return (
    <>
     <div className="image-container">
        <div className="image">
          <img src="../images/specialities/medical-report.gif" alt="medical" />
        </div>
        <h1>OTTAWA E-HOSPITAL</h1>
        <p>I'm a Virtual Assistant, how can I help you</p>
      </div>
     
    <div className="input">
      <button className="talk">
        <i className="fas fa-microphone-alt"></i>
      </button>
      <h1 className="content">{transcript || "Start speaking..."}</h1>
    </div>
    <div>
        {recordImage.data && (
          <img
            src={`data:${recordImage.mimetype};base64,${recordImage.data}`}
            alt="recordImage"
          />
        )}
      </div>
 
    </>
  );
};
 
 
export default VoiceRecognition;