import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import './Chatbot.css';

const ChatComponent = ({ userInfo }) => {
  const location = useLocation();
  const patientData = location.state;
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const chatOutputRef = useRef(null);
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition ||
    window.oSpeechRecognition;

  const recognition = new SpeechRecognition();
  var totalMessage = "";

  useEffect(() => {
    // Scroll to the bottom of the chat output on each message update
    chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;

    // Set up speech recognition
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.onresult = handleSpeechResult;
    recognition.onend = handleSpeechEnd;

    return () => {
      // Cleanup speech recognition on component unmount
      recognition.stop();
    };
  }, [messages]);

  const handleSpeechResult = (event) => {
    const last = event.results.length - 1;
    const userMessage = event.results[last][0].transcript.trim();
    setMyMessage(userMessage);
  };

  const setMyMessage = (userMessage) => {
    totalMessage = totalMessage + userMessage + " ";
    document.getElementById('user-input').value = totalMessage;
  }
  
  const handleSpeechEnd = () => {
    // Restart speech recognition when it ends
    if (isListening) {
      recognition.stop();
    }
  };

  const toggleSpeechRecognition = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      console.log("STopping recongition");
      setIsListening(false);
      recognition.stop();
    }
  };

  const startSpeechRecognition = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopSpeechRecognition = () => {
    setIsListening(false);
    recognition.stop();
  };

  function handleKeyUp(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  const appendMessage = (message, sender) => {
    // Create the new message element
    const messageElement = (
      <div key={messages.length} className={`message ${sender.toLowerCase()}`}>
        <div className="message-bubble" style={getStyle(sender)}>
          {message}
        </div>
      </div>
    );
  
    // Filter the previous messages to retain only the last consecutive 'Bot' message
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (
        lastMessage &&
        lastMessage.props.className.includes('bot') &&
        messageElement.props.className.includes('bot')
      ) {
        // If the last message and the current message are both 'Bot', replace the last one
        return [...prevMessages.slice(0, -1), messageElement];
      } else {
        // Otherwise, add the current message to the list
        return [...prevMessages, messageElement];
      }
    });
  };
  



  const getStyle = (sender) => {
    return sender === 'You'
      ? {
          backgroundColor: '#20B2AA',
          color: 'white',
          borderRadius: '8px',
          padding: '10px',
        }
      : {
          backgroundColor: '#8E8F88',
          color: 'white',
          borderRadius: '8px',
          padding: '10px',
        };
  };

  const sendMessage = async () => {
    if (isListening) {
     toggleSpeechRecognition();
    }

    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage !== '') {
      appendMessage(userMessage, 'You');

      const requestData = {
        userObject: {
          userInput: {
            message: userMessage,
          },
        },
      };

      userInput.value = '';
      try {
        let url;
        let prefix = "https://48so6vynld.execute-api.ca-central-1.amazonaws.com";
        if (patientData) {
          url = `${prefix}/doctor/${userInfo.id}/${patientData.id}/`
        }
        else {
          url = `${prefix}/patient/${userInfo.id}`
        }
        console.log("URL", url);
          const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
          
        const reader = response.body.getReader();
        let partialText = '';
        let speechText = '';
        let i = 1;
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          const newChunk = new TextDecoder('utf-8').decode(value);
          partialText += newChunk;
          speechText = partialText.split(/[,;:.]+/);
          console.log(i, speechText);

          if(i < speechText.length) {
            console.log("SPEAKING")
            // console.log(speechText[i]);
            speak(speechText[i-1]);
            i += 1;
          }
          if(speechText[i-1].includes('.')) {
            speak(speechText[i-1])
          }
          appendMessage(partialText, 'Bot');
        }

      } catch (error) {
        console.error('Error:', error);
      }

      userInput.value = '';
    }
  };

  function resolve(voices, message) {
    var synth = window.speechSynthesis;
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.voice = voices[7];
    utter.text = message;
    utter.volume = 100.0;
    synth.speak(utter);
}
  const speak = (message) => {
   
    let voices = speechSynthesis.getVoices();
    let gotVoices = false;
    if (voices.length) {
        resolve(voices, message);
    } else {
        speechSynthesis.onvoiceschanged = () => {
            if (!gotVoices) {
                voices = speechSynthesis.getVoices();
                gotVoices = true;
                if (voices.length) resolve(voices, message);
            }
        };
    }



    // const synth = window.speechSynthesis;
    // const utterance = new SpeechSynthesisUtterance(message);

    // const voices = synth.getVoices();
    // const ladyVoice = voices.find((voice) => voice.name === 'Google UK English Female');
    // utterance.voice = ladyVoice;
    // synth.speak(utterance);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  if (!userInfo || !userInfo.name) {
    alert('Please Login First');
    // TODO: Redirect to Login Page
  }

  return (
    <div className="chat-page-container">
      <div className="chat-container">
        <div className="chat-header">
          <h1>Medical Chat Assessment</h1>
        </div>
        <div className="chat-output" id="chat-output" ref={chatOutputRef}>
          {messages}
        </div>
        <div className="chat-input">
          <input
            type="text"
            id="user-input"
            placeholder="Type a message..."
            onKeyUp={handleKeyUp}
          />
          <button onClick={sendMessage}>Send</button>
          <button
            onClick={toggleSpeechRecognition}
            style={{ backgroundColor: isListening ? 'gray' : 'green' }}
            disabled={isListening}
          >
            {isListening ? 'Listening...' : 'Start Speech'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
