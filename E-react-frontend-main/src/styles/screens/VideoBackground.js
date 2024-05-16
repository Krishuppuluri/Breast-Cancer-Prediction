import React from 'react';
import video from '../screens/your-video.mp4';

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay muted loop className="fullscreen-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
