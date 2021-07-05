import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResult, selectResult } from '../result/resultSlice';
import { getAudio } from '../player/playerSlice';
import { Player } from '../player/Player';
import {
  Link,
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
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const location = useLocation();
  const phrase = query.get('phrase')
  const dispatch = useDispatch();
  const result = useSelector(selectResult);
  const { tense, verb, conjugation, media, num } = useParams();

  result.forEach(cap => {
    if (parseInt(cap.num)===parseInt(num)){
       handlePlay(cap)
    }
  })

  useEffect(() => {
    dispatch(getResult(`${media}^${num}`))
  }, [dispatch, media, num]);

  function handleTranslate(cap) {
    window.open(
      `https://translate.google.com/?sl=es&tl=en&text=${cap.cap}&op=translate`,
      '_blank'
    )
  }
  function handlePlay(cap) {
    dispatch(getAudio({record: cap, trim_or_extend: false}))
  }

  function CurrentCap(props) {
    if (parseInt(num) === parseInt(props.cap.num)) {
      return(<i><u>{props.cap.cap}</u></i>)
    }
    return(<span>{props.cap.cap}</span>)
  }



  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
      <CrumbLink  conjugation={conjugation} phase={phrase} media={media} num={num} tense={tense} verb={verb} />
      <br/><br/>
      <Grid container>
        <Grid item xs={12}>
          <Player />
        </Grid>
        <Grid item xs={4}>
          <PrevNextLink direction='prev' conjugation={conjugation} phase={phrase} media={media} num={num} verb={verb}/>
        </Grid>
        <Grid item xs={4}>
          <ShowFavorite media={media} num={num} result={result} />
        </Grid>
        <Grid item xs={4}>
          <PrevNextLink direction='next' conjugation={conjugation} phase={phrase} media={media} num={num} verb={verb}/>
        </Grid>
        <br/>
        <br/>
        {result.map((cap, i3) => (
          <Grid container key={i3+1000}>
            <Grid item xs={1}>
              <Translate onClick = {() => handleTranslate(cap)} style={{cursor: 'pointer'}} />
            </Grid>
            <Grid item xs={11}>
              <span onClick = {() => handlePlay(cap)} style={{cursor: 'pointer'}} >{cap.cap}</span>
            </Grid>
          </Grid>
          ))}

      </Grid>
    </Container>
  );
}
