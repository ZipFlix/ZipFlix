
import React, { useState } from 'react';
import VideoModal from './VideoModal';

const VideoModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoUrl = 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID';


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Video Modal</button>
      <VideoModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        videoUrl={videoUrl}
      />
    </div>
  );
};

export default VideoModal;






