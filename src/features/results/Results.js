import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResults, selectResults, setSelectedResult } from './resultsSlice';

import { getAudio } from '../player/playerSlice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  useParams,
  useLocation
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontSize: 14,
    paddingBottom: 40
  },

  title: {
    fontSize: 14,
  },

});

export function Results(props) {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const language = localStorage.getItem('language')
  let query = useQuery();
  const phrase = query.get('phrase') ? query.get('phrase').split('?')[0] : null
  const is_chengyu = query.get('is_chengyu')
  const is_idiom = query.get('is_idiom')
  // if (phrase) {
  //   phrase = phrase.toLowerCase()
  // }
  const dispatch = useDispatch();
  const {conjugation} = props

  let results = useSelector(selectResults);

  if (!conjugation && !phrase) {
    results = []
  }

  const classes = useStyles();
  const { tense, verb, media } = useParams();

  useEffect(() => {
    if (!!phrase) {
      if (phrase.length > 0) {
        return dispatch(getResults({
          query: phrase,
          is_idiom: is_idiom,
          media: media
        }))
      }
    }
    dispatch(getResults({query: conjugation, media: media}))

  }, [conjugation, dispatch, phrase, media]);

  function handlePlay(cap) {
    dispatch(getAudio(cap))
    dispatch(setSelectedResult(cap))
  }

  function parseLink(cap, tense, verb, conjugation, media) {
    let link = ''
    if (phrase) {
      if (is_chengyu) {
        link = `/search/${cap.name.name.replace(/\s+/g, '_')}/${cap.num}?phrase=${phrase}&is_chengyu=true&`
      }
      link = `/search/${cap.name.name.replace(/\s+/g, '_')}/${cap.num}?phrase=${phrase}&`
    } else if (tense) {
      link = `/tenses/${tense}/${verb}/${conjugation}/${cap.name.name.replace(/\s+/g, '_')}/${cap.num}?`
    } else {
        link = `/media/${media}/${verb}/${conjugation}/${cap.num}?`
    }
    return link += `language=${language}`
  }


  const past_searches = Object.keys(localStorage).reduce((h, k) => {
    if (k.match('search')) {
      h[localStorage[k]] = 1
    }
    return h
  }, {})

  function NoResults() {
      return (<>No results for <b>{phrase}</b> in {language}</>)
  }

  if (results.length === 0) {
    return (<span><NoResults/></span>)
  }
  // Hack to ensure ghost searches don't emerge. 'aaaa' somehow brings up searches for 'a'
  if (!!phrase) {
    if (!past_searches[phrase]) {
      // if (results[0].children[0].cap.match(phrase)) {
      //   console.log('0000')
      //     localStorage.setItem('search-' + language + '-' + Date.now(), phrase)
      // } else {
      //   console.log('1111')
      //   return (<span><NoResults/></span>)
      // }

    }

  }

  function ViewMore(props) {
    const {total, media} = props
    if (total > 2) {
      return (
        <>
          <Link style={{textDecoration: 'none'}} to={`search/${media}?${query}`} >View more</Link>
        </>
      )
    }
    return (
      <></>
    )
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >

        {results.map((result, i) => (
          <div key={i} className={classes.root} >

                  <Typography variant="h5" component="h2">
                    {result.name}
                  </Typography>

                  {result.children.map((cap, i2) => (
                    <div key={i2+1000} >
                        <Grid container style={{paddingBottom:'2px'}}>
                          <Grid item xs={1} onClick={() => handlePlay(cap)}>
                            *
                          </Grid>
                          <Grid item xs={11}>
                            <Link style={{textDecoration: 'none'}} to={parseLink(cap, tense, verb, conjugation, result.name)} >{cap.cap}</Link>
                          </Grid>
                        </Grid>
                        </div>
                    ))}
                    <ViewMore total={result.total_caps} media={result.name} />
              </div>
          ))}
    </Container>
  );
}
