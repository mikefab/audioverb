import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResult, selectResult } from '../result/resultSlice';
import { getAudio } from '../player/playerSlice';
import { Player } from '../player/Player';
import {
  Link,
  useParams,
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Translate from '@material-ui/icons/Translate';
import Grid from '@material-ui/core/Grid';

export function Result() {
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
    dispatch(getAudio(cap))
  }

  let link_is_visible = 'hidden';

  if (typeof tense !== 'undefined')  {
    link_is_visible = 'visible';
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
      <span style={{visibility: link_is_visible}}>
        <Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <Link to={`/tenses/${tense}/${verb}`}>{verb}</Link> / <Link to={`/tenses/${tense}/${verb}/${conjugation}`}>{conjugation}</Link>
      </span>
      <br/><br/>
      <Grid container>
        <Grid item xs={12}>
          <Player />
        </Grid>
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
