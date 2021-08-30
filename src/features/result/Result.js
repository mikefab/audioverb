import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResult, selectResult } from '../result/resultSlice';
import { getAudio } from '../player/playerSlice';
import { Player } from '../player/Player';
import {
  useParams,
  useLocation
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Translate from '@material-ui/icons/Translate';
import Grid from '@material-ui/core/Grid';
import {PrevNextLink} from './helpers/PrevNextLink'
import {CrumbLink} from './helpers/SuperLink'
import {ShowFavorite} from './helpers/ShowFavorite'

import '../..//App.css';
export function Result() {
  const language = localStorage.getItem('language')
  const google_languages = {
    'Chinese': 'zh-CN',
    'Spanish': 'es'
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const phrase = query.get('phrase')
  const dispatch = useDispatch();
  const result = useSelector(selectResult);

  const [num, setNum] = useState(useParams().num)
  const [sparkDirection, setDirection] = useState(0)


  let { tense, verb, conjugation, media} = useParams();


  result.forEach(cap => {
    if (parseInt(cap.num)===parseInt(num)){
       setTimeout(() => {
          dispatch(getAudio({record: cap, trim_or_extend: false}))
       }, 1000)
    }
  })

  useEffect(() => {
    dispatch(getResult(`${media}^${num}`))
  }, [dispatch, media, sparkDirection]);


  function handleTranslate(cap) {
    window.open(
      `https://translate.google.com/?sl=${google_languages[language]}&tl=${localStorage.getItem('my_language') || 'en'}&text=${cap.cap}&op=translate`,
      '_blank'
    )
  }
  function handlePlay(cap) {
    setNum(cap.num)
    dispatch(getAudio({record: cap, trim_or_extend: false}))
  }

  function handlePrevNext(num) {
    setDirection(sparkDirection + 1)
    setNum(num)
  }

  function currentCap(cap_num) {
    if (parseInt(num) === parseInt(cap_num)) {
      return('underline')
      // return(<i><u>{props.cap.cap}</u></i>)
    }
    return 'none'
    // return(<span>{props.cap.cap}</span>)
  }

  function process_cap(cap) {
    if (language != 'Chinese') {
      return cap
    }
    return (
      <span>
      {cap.split('').map((cap, i4) => (
        <span key={i4+10000}>
           <a href={`http://www.strokeorder.info/mandarin.php?q=${cap}`} target="_blank" >{cap}</a>
           </span>
        ))}
      </span>
    )
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
      <CrumbLink  conjugation={conjugation} phrase={phrase} media={media} num={num} tense={tense} verb={verb} />
      <br/><br/>
      <Grid container>
        <Grid item xs={12}>
          <Player />
        </Grid>
        <Grid item xs={4}>
          <span onClick = {() => { handlePrevNext(parseInt(num) -1)}}>
          <PrevNextLink direction='prev' conjugation={conjugation} phrase={phrase} media={media} num={num} verb={verb}/>
          </span>
        </Grid>
        <Grid item xs={4}>
          <ShowFavorite media={media} num={num} result={result} />
        </Grid>
        <Grid item xs={4}>
          <span onClick = {() => { handlePrevNext(parseInt(num) +1)}}>
          <PrevNextLink  direction='next' conjugation={conjugation} phrase={phrase} media={media} num={num} verb={verb}/>
          </span>
        </Grid>
        <br/>
        <br/>
        {result.map((cap, i3) => (
          <Grid container key={i3+1000}>
            <Grid item xs={1}>
              <Translate onClick = {() => handleTranslate(cap)} style={{cursor: 'pointer'}} />
            </Grid>
            <Grid item xs={11}>
              <span onClick = {() => handlePlay(cap)} style={{cursor: 'pointer', textDecoration: currentCap(cap.num)}}>{process_cap(cap.cap)}</span>
            </Grid>
          </Grid>
          ))}

      </Grid>
    </Container>
  );
}
