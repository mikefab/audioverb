import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResult, selectResult, getNeighborNums, selectNeighborNums } from '../result/resultSlice';
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
import track_history from '../../helper'

import '../..//App.css';
export function Result() {
  const location = useLocation()
  const language = localStorage.getItem('language')
  const google_languages = {
    'chinese': 'zh-CN',
    'spanish': 'es',
    'french': 'fr',
    'english': 'en',
    'italian': 'it',
    'korean': 'ko',
    'thai': 'th',
    'turkish': 'tr'
  }

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const phrase = query.get('phrase') ? query.get('phrase').split('?')[0] : null
  const is_chengyu = !!location.pathname.match(/\/is_chengyu/)
  const dispatch = useDispatch();
  const result = useSelector(selectResult);
  const {num_prev, num_next} = useSelector(selectNeighborNums);

  const [num, setNum] = useState(useParams().num)
  console.log(num_prev, num_next, 'nnn', num)
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
    const obj = {
      media,
      num
    }
    dispatch(getResult(obj))
  }, [dispatch, media, sparkDirection]);


  function handleTranslate(cap) {
    console.log(language)
    window.open(
      `https://translate.google.com/?sl=${google_languages[language]}&tl=${localStorage.getItem('my_language') || 'en'}&text=${cap.cap}&op=translate`,
      '_blank'
    )
  }
  function handlePlay(cap) {
    track_history(media, cap.num)
    setNum(cap.num)
    dispatch(getNeighborNums({num: cap.num, media}))
    dispatch(getAudio({record: cap, trim_or_extend: false}))
  }

  function handlePrevNext(num, direction) {
    setNum(direction.match('prev') ? num_prev : num_next)
    setDirection(sparkDirection + 1)
  }
  function isMainCap(cap_num) {
    if (parseInt(num) === parseInt(cap_num)) {
      return true
    }
    return false
  }
  function currentCap(cap_num) {
    if (isMainCap(cap_num)) {
      return('underline')
    }
    return 'none'
  }


  function process_cap(cap) {
    const cap_num = cap.num
    if (!language.match(/Chinese/i)) {
      return cap.cap
    }

    if (!isMainCap(cap_num)) {
      return cap.cap
    }
    return (
      <span>
      {cap.cap.split('').map((cap, i4) => (
        <span key={i4+10000}>
           <a href={`http://www.strokeorder.info/mandarin.php?q=${cap}`} target="_blank" rel="noreferrer">{cap}</a>
           </span>
        ))}
      </span>
    )
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
      <CrumbLink  conjugation={conjugation} phrase={phrase} media={media} num={num} tense={tense} verb={verb} is_chengyu={is_chengyu} />
      <br/><br/>
      <Grid container>
        <Grid item xs={12}>
          <Player />
        </Grid>
        <Grid item xs={4}>
          <span onClick = {() => { handlePrevNext(parseInt(num), 'prev')}}>
          <PrevNextLink direction='prev' conjugation={conjugation} phrase={phrase} media={media} num={num_prev} verb={verb} language={language}/>
          </span>
        </Grid>
        <Grid item xs={4}>
          <ShowFavorite media={media} num={num} result={result} />
        </Grid>
        <Grid item xs={4}>
          <span onClick = {() => { handlePrevNext(parseInt(num), 'next')}}>
          <PrevNextLink  direction='next' conjugation={conjugation} phrase={phrase} media={media} num={num_next} verb={verb} language={language}/>
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
              <span onClick = {() => handlePlay(cap)} style={{cursor: 'pointer', textDecoration: currentCap(cap.num)}}>{process_cap(cap)}</span>
            </Grid>
          </Grid>
          ))}

      </Grid>
    </Container>
  );
}
