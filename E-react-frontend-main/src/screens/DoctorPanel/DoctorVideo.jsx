import React, { useEffect, useRef, useState } from 'react';
import '../../styles/screens/DoctorVideo.css';
import CameraIcon from '../../styles/images/DoctorVideo/camera.png';
import MicIcon from '../../styles/images/DoctorVideo/mic.png';
import PhoneIcon from '../../styles/images/DoctorVideo/phone.png';
import AgoraRTC from "agora-rtc-sdk-ng";
import { useLocation } from 'react-router-dom';
import FloatingChatWindow from '../../components/FloatingChatWindow';
import Button from '@mui/material/Button';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function DoctorVideo() {
    const remotePlayerContainerRef = useRef(null);
    const localPlayerContainerRef = useRef(null);
    const channelParametersRef = useRef({
        localAudioTrack: null,
        localVideoTrack: null,
        remoteAudioTrack: null,
        remoteVideoTrack: null,
        remoteUid: null,
    });
    const agoraEngineRef = useRef(null);
    const [isCameraMuted, setIsCameraMuted] = useState(false);
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [windowOpen, setwindowOpen] = useState(false);
    const toggleChatWindow = () => {
        setwindowOpen(!windowOpen);
    };

    const APP_ID = "8310514e8aff413b87abb9d0bdb095bb";

    const query = useQuery();
    const doctorId = query.get('doctorID');
    const patientId = query.get('patientID');
    const roomId = patientId;
    let C_IDENTITY = null;
    if (patientId && !doctorId)
    {
        C_IDENTITY = 'patient';
    }

    if (doctorId && patientId) 
    {
        C_IDENTITY = 'doctor';
    }
    

    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    useEffect(() => {
        // Place the init function within the useEffect
        async function init() {
            if (agoraEngineRef.current) {
                // we see that useEffect can run twice during initialization, so return for the second time.
                return;
            }

            const setupAgoraEngine = async () => {
                agoraEngineRef.current = new AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
            };
            await setupAgoraEngine();

            agoraEngineRef.current.on("user-published", async (user, mediaType) => {
                await agoraEngineRef.current.subscribe(user, mediaType);
                console.log("subscribe success");

                if (mediaType === "video") {
                    channelParametersRef.remoteVideoTrack = user.videoTrack;
                    channelParametersRef.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.remoteUid = user.uid.toString();
                    channelParametersRef.remoteVideoTrack.play(remotePlayerContainerRef.current);


                    localPlayerContainerRef.current.classList.add('smallFrame');
                    remotePlayerContainerRef.current.style.display = 'block';
                }
                if (mediaType === "audio") {
                    channelParametersRef.remoteAudioTrack = user.audioTrack;
                    channelParametersRef.remoteAudioTrack.play();
                }
            });

            agoraEngineRef.current.on("user-unpublished", (user, mediaType) => {
            });

            agoraEngineRef.current.on("user_joined", (user) => {
                localPlayerContainerRef.current.classList.add('smallFrame');
                remotePlayerContainerRef.current.style.display = 'block';
            });

            agoraEngineRef.current.on("user-left", (user, reason) => {
                localPlayerContainerRef.current.classList.remove('smallFrame');
                remotePlayerContainerRef.current.style.display = 'none';
            });

            await agoraEngineRef.current.join(
                APP_ID,
                roomId,
                null, /* token */
                uuidv4() /* uid */
            );

            channelParametersRef.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
            channelParametersRef.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

            await agoraEngineRef.current.publish([
                channelParametersRef.localAudioTrack,
                channelParametersRef.localVideoTrack,
            ]);
            channelParametersRef.localVideoTrack.play(localPlayerContainerRef.current);
            console.log('live local Video Track', channelParametersRef.localVideoTrack)
        }
        init();

        return () => {
            agoraEngineRef.current.leave();
        };
    }, []);


    let toggleCamera = async () => {
        if (channelParametersRef.localVideoTrack) {
            let isMuted = channelParametersRef.localVideoTrack.muted;
            isMuted = !isMuted
            setIsCameraMuted(isMuted);
            await channelParametersRef.localVideoTrack.setMuted(isMuted);
        }
    };

    let toggleMic = async () => {
        if (channelParametersRef.localAudioTrack) {
            let isMuted = channelParametersRef.localAudioTrack.muted;
            isMuted = !isMuted
            setIsMicMuted(isMuted);
            await channelParametersRef.localAudioTrack.setMuted(isMuted);
        }
    };

    let handleLeaveClick = async () => {
        if (agoraEngineRef.current) {
            await agoraEngineRef.current.leave();
        }
        window.close();
    };

    return (
        <div class="content-container">
            <div id="videos" className={windowOpen ? 'chat-open' : ''}>
                <video ref={localPlayerContainerRef} className="video-player" id="user-1" autoPlay playsInline></video>
                <video ref={remotePlayerContainerRef} className="video-player" id="user-2" autoPlay playsInline></video>
            </div>

            <div id="controls">
                <div
                    className="control-container"
                    id="camera-btn"
                    onClick={toggleCamera}
                    style={{ backgroundColor: isCameraMuted ? 'rgb(179, 102, 249, .9)' : 'rgb(255, 80, 80)' }}
                >
                    <img src={CameraIcon} alt="Camera" />
                </div>

                <div
                    className="control-container"
                    id="mic-btn"
                    onClick={toggleMic}
                    style={{ backgroundColor: isMicMuted ? 'rgb(179, 102, 249, .9)' : 'rgb(255, 80, 80)' }}
                >
                    <img src={MicIcon} alt="Microphone" />
                </div>

                <div className="control-container" id="leave-btn" onClick={handleLeaveClick}>
                    <img src={PhoneIcon} alt="Leave" />
                </div>
            </div>
            <div>
                <Button 
                    variant="contained" 
                    sx={{ 
                        mt: 2, 
                        width: '210px', // Custom width
                        position: 'fixed', // Fixed position relative to the viewport
                        bottom: '20px', // Distance from the bottom
                        right: '20px' // Distance from the right
                      }} 
                    onClick={toggleChatWindow}>
                    Live Text Chat
                </Button>
                {windowOpen && (
                    <FloatingChatWindow
                        doctorId={doctorId}
                        patientId={patientId}
                        identity = {C_IDENTITY}
                        closeChat={toggleChatWindow}
                    />
                )}
            </div>
        </div>
    );
}

export default DoctorVideo;