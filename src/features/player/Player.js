import React, {useEffect} from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector, useDispatch } from 'react-redux';
import { selectAudioURL, selectRecordParams, getAudio, saveCut} from './playerSlice';
import { selectCurrentResult } from '../results/resultsSlice'
import {
  useParams
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Save from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

export function Player() {
  const dispatch = useDispatch();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const player = document.getElementById('player')
    player.pause()

  }, []);
  let audioURL = useSelector(selectAudioURL);
  const selected_result = useSelector(selectCurrentResult);
  let start;
  let stop;
  let nam;
  const record_params =  useSelector(selectRecordParams)
  let { num } = useParams();
  if (audioURL) {
    start = record_params.start
    stop = record_params.stop
    nam = record_params.nam
    num = record_params.num
  }

  function handleSaveCut(obj) {
    if (obj) {
      start = obj.start
      stop = obj.stop
    }
    localStorage.setItem(`cut-${nam}-${num}`, `${start}-${stop}`)
    return dispatch(saveCut({
      name: nam,
      num: num,
      start: start,
      stop: stop
    }))
  }

  function alter(kind) {
    if (audioURL) {
      let obj = {}
      if (audioURL) {
        obj = {
          start,
          stop,
          nam,
          num
        }

        if (kind.match('prepend')) {
          obj.start -= 0.5
        }

        if(kind.match('shave front')) {
          obj.start += 0.5
        }

        if (kind.match('extend back')) {
          obj.stop += 0.5
        }

        if (kind.match('shave back')) {
          obj.stop -= 0.5
        }
        handleSaveCut(obj)
        dispatch(getAudio({record: obj, trim_or_extend:true}))



      }
    }
  }

  function SaveButton() {
    if (localStorage.getItem('user_code')) {
      return (
        <>
        <ButtonGroup color="primary" size="large" aria-label="outlined primary button group">
          <Button className='player_button' onClick = {() => {handleSaveCut()}} ><Save /></Button>
        </ButtonGroup>
        </>
      )
    }
    return (
      <></>
    )
  }

  return (
    <div>
    <Grid container>
      <Grid container>
          <Grid item xs={12}>
            <ButtonGroup color="primary" size="large" aria-label="outlined primary button group">
              <Button className='player_button' onClick = {() => {alter('prepend')}}><Add/></Button>
              <Button className='player_button' onClick = {() => {alter('shave front')}}><Remove /></Button>
              <Button className='player_button' onClick = {() => {alter('shave back')}}><Remove /></Button>
              <Button className='player_button' onClick = {() => {alter('extend back')}}><Add /></Button>
            </ButtonGroup>
            <SaveButton />
          </Grid>
          <Grid item xs={12}>

            <ReactAudioPlayer
              src={ audioURL }
              autoPlay
              controls
              id='player'
            />
            </Grid>
          <Grid item xs={12} style={{minHeight: '60px'}}>
              {selected_result.cap}
          </Grid>
        </Grid>
      </Grid>
</div>

  );
}
