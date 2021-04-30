import React, {} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';
import { selectAudioURL } from './playerSlice';

export function Player() {
  const audioURL = useSelector(selectAudioURL);

  return (
    <div className="container">
      <ReactAudioPlayer
        src={ audioURL }
        autoPlay
        controls
      />
    </div>
  );
}
