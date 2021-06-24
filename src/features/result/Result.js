import React, { useEffect } from 'react';
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
import Next from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import '../..//App.css';
export function Result() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

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
    dispatch(getAudio(cap))
  }

  function addPharse() {
    if (!!phrase) {
      return `?phrase=${phrase}`
    }
    return ''
  }

  function CraftLink() {
    if (typeof tense !== 'undefined')  {
      return(<span className='crumbs'><Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <Link to={`/tenses/${tense}/${verb}`}>{verb}</Link> / <Link to={`/tenses/${tense}/${verb}/${conjugation}`}>{conjugation}</Link></span>)
    } else if ((!!phrase)) {
      return (<span className='crumbs'><Link to={`/search?phrase=${phrase}`}>search:  {phrase}</Link></span>)
    }
      return (<span className='crumbs'><Link to={`/medias/`}>medias</Link> / <Link to={`/media/${media}`}>{media}</Link> / <Link to={`/media/${media}/${verb}/${conjugation}`}>{verb}</Link> / <Link to={`/media/${media}/${verb}/${conjugation}`}>{conjugation}</Link></span>)
  }

  function CraftPrevNextLink(props) {
    const direction = props.direction
    if (!!phrase)  {
      const amount = direction === 'prev' ? parseInt(num) - 1 : parseInt(num) + 1
      if (direction === 'prev') {
        return (<Link to={`/search/${media}/${amount}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/search/${media}/${amount}${addPharse()}`}><Next /></Link>)
    }

    if (direction === 'prev') {
      return (<Link to={`/media/${media}/${verb}/${conjugation}/${parseInt(num) - 1}`}> <NavigateBefore/> </Link>)
    }
      return (<Link to={`/media/${media}/${verb}/${conjugation}/${parseInt(num) + 1}`}> <Next/> </Link>)
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
      <CraftLink />
      <br/><br/>
      <Grid container>
        <Grid item xs={12}>
          <Player />
        </Grid>
        <Grid item xs={6}>
          <CraftPrevNextLink direction='prev'/>
        </Grid>
        <Grid item xs={6}>
          <CraftPrevNextLink direction='next'/>
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
