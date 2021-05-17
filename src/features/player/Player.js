import React, {useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';
import { selectAudioURL } from './playerSlice';

export function Player() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const player = document.getElementById('player')
    player.pause()

  }, []);
  const audioURL = useSelector(selectAudioURL);

  return (
    <div className="container">
      <ReactAudioPlayer
        src={ audioURL }
        autoPlay
        controls
        id='player'
      />
    </div>
  );
}
