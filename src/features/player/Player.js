import React, {useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { selectAudioURL, getAudio } from './playerSlice';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Grid from '@material-ui/core/Grid';

export function Player() {
  const dispatch = useDispatch();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const player = document.getElementById('player')
    player.pause()

  }, []);
  let audioURL = useSelector(selectAudioURL);

  function alter(kind) {
    let obj = {}
    if (audioURL) {

      const ary = audioURL.split('/')
      const matched = ary[ary.length - 1].match(/(\d+\.?\d)(~)(\d+\.?\d)(_)(.+?)(.mp3)/)

      obj = {
        start: parseFloat(matched[1]),
        stop: parseFloat(matched[3]),
        nam: matched[5]
      }
      console.log(obj.start, obj.stop)

      if (kind.match('prepend')) {
        obj.start -= 0.5
      }

      if(kind.match('shave front'))
        obj.start += 0.5
      }

      if (kind.match('extend back')) {
        obj.stop += 0.5
      }

      if (kind.match('shave back')) {
        obj.stop -= 0.5
      }

      console.log(obj)
      dispatch(getAudio(obj))
  }

  return (
    <div>
    <Grid container>

    <Grid container>
          <Grid item xs={12}>
            <ButtonGroup color="primary" size="large" aria-label="outlined primary button group">
              <Button onClick = {() => {alter('prepend')}}><Add/></Button>
              <Button onClick = {() => {alter('shave front')}}><Remove /></Button>
              <Button onClick = {() => {alter('shave back')}}><Remove /></Button>
              <Button onClick = {() => {alter('extend back')}}><Add /></Button>
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
