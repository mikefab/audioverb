import React, {useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector } from 'react-redux';
import { selectAudioURL } from './playerSlice';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';

export function Player() {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const player = document.getElementById('player')
    player.pause()

  }, []);
  const audioURL = useSelector(selectAudioURL);

  return (
    <div>
    <Grid container>

    <Grid container>
          <Grid item xs={12}>
            <ButtonGroup color="primary" size="large" aria-label="outlined primary button group">
              <Button><Add /></Button>
              <Button><Remove /></Button>
              <Button><Remove /></Button>
              <Button><Add /></Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>

            <ReactAudioPlayer
              src={ audioURL }
              autoPlay
              controls
              id='player'
            />
            </Grid>
          <Grid item xs={12}>
            <ButtonGroup color="primary" size="large" aria-label="outlined primary button group">
              <Button><NavigateBefore /></Button>
              <Button><NavigateNext /></Button>
            </ButtonGroup>
          </Grid>
        </Grid>

          </Grid>
</div>

  );
}
