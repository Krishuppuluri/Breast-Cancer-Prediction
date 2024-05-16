import React, { useState, useEffect, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './FloatingChatWindow.css';
import axios from 'axios';




const FloatingChatWindow = ({ patientId, doctorId, closeChat, identity }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef(null);
    const ws = useRef(null);
    let C_ID = null;
    let otherSideId = null;
    let C_IDENTITY = identity;
    let otherSideIdentity = identity == 'doctor' ? 'patient' : 'doctor';


    useEffect(() => {
        async function fetchData() {
            if (C_IDENTITY === 'doctor') {
                C_ID = doctorId; 
                otherSideId = patientId;
            } else if (C_IDENTITY === 'patient') {
                C_ID = patientId;
                await axios.get(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/chat/getDoctorIDByPatientID?patientId=${patientId}`)
                    .then(response => {
                        // Ensure that you have a valid response here
                        otherSideId = response.doctorId; // Assuming the ID is in the data object of the response
                    })
                    .catch(error => {
                        // Handle the error here
                        console.error("An error occurred while fetching the patient info:", error);
                        // Set otherSideId to a default or null
                        otherSideId = null;
                    });
            } else {
                // Handle the case where C_IDENTITY is not 'doctor' or 'patient'
                console.error("Invalid C_IDENTITY value:", C_IDENTITY);
            }

            ws.current = new WebSocket('wss://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/chat/sendMessage');

            ws.current.onopen = () => {
                console.log("WebSocket connection opened");
            };


            ws.current.onmessage = (event) => {
                const parsedMessage = JSON.parse(event.data);
                console.log(parsedMessage);
                console.log(typeof parsedMessage.chatMessage.receiver);
                console.log(typeof C_ID);

                if (String(C_ID) === String(parsedMessage.chatMessage.receiver) && C_IDENTITY === parsedMessage.chatMessage.receiverIdentity) {
                    setChatHistory(prevHistory => parsedMessage.chatMessage.message && [...prevHistory, parsedMessage.chatMessage]);
                }

            };

            ws.current.onclose = () => {
                console.log("WebSocket connection closed");
            };
        }


        fetchData();

    }, []);

    useEffect(() => {
        const chatHistoryDiv = document.querySelector('.chat-history');
        if (chatHistoryDiv) {
            chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
        }
    }, [chatHistory]);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
            event.preventDefault(); 
        }
    };

    const handleSendMessage = async () => {
        if (C_IDENTITY === 'doctor') {
            C_ID = doctorId;
            otherSideId = patientId;
        } else if (C_IDENTITY === 'patient') {
            C_ID = patientId;

            await axios.get(`https://e-react-node-backend-22ed6864d5f3.herokuapp.com/api/chat/getDoctorIDByPatientID?patientId=${C_ID}`)
                .then(response => {
                    // Ensure that you have a valid response here
                    otherSideId = response.data.doctorId; // Assuming the ID is in the data object of the response
                })
                .catch(error => {
                    // Handle the error here
                    alert("An error occurred while fetching the patient info:", error);
                    // Set otherSideId to a default or null
                    otherSideId = null;
                });
        } else {
            // Handle the case where C_IDENTITY is not 'doctor' or 'patient'
            console.error("Invalid C_IDENTITY value:", C_IDENTITY);
        }
        if (inputMessage) {
            const message = {
                message: inputMessage,
                sender: C_ID,
                receiver: otherSideId,
                senderIdentity: C_IDENTITY,
                receiverIdentity: otherSideIdentity,
            };
            console.log(message);
            ws.current.send(JSON.stringify(message));
            setChatHistory(prevHistory => [...prevHistory, message]);

            setInputMessage("");  // Clear the input field after sending
        }


    };

    return (
        <div className="floating-chat">

            <div className="chat-container" style={{ position: 'relative' }}>
                <IconButton
                    aria-label="close"
                    onClick={closeChat}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1, // Make sure it's above other elements
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <div className="chat-box">
                    <div className="chat-history">
                        {chatHistory && chatHistory.map(chatMessage => (
                            <div className={chatMessage.senderIdentity != C_IDENTITY ? 'chat-left' : 'chat-right'}>
                                {chatMessage.message}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Send a message..." value={inputMessage} onChange={e => setInputMessage(e.target.value)} onKeyDown={handleKeyDown} />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FloatingChatWindow;