import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIdioms,
  getIdioms,
  getIdiomsByMedia
} from './idiomsSlice';
import {selectLanguage} from '../language/languageSlice';

import {
  Link,
  useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export default function Idioms(props) {
  const {media} = props
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  // const { media } = useParams();
  const idioms = useSelector(selectIdioms);
console.log('222')
  useEffect(() => {
    console.log('111')
    if (media) {
      return dispatch(getIdiomsByMedia(media))
    }

    dispatch(getIdioms())
  }, [dispatch, language, media]);

  function IdiomContent() {
    if (idioms.length > 0) {
      return (
        <>
          <p>
            <strong>
              成语
            </strong>
          </p>
        <Grid container spacing={1} style={{fontSize: '14px'}}>
        {idioms.map((idiom, i) => (
          <Grid item xs={3} key={ Math.random().toString(36).substr(2, 9) }>
            <Link to={`/search?is_chengyu=true&phrase=${idiom}`}>{idiom}</Link>
          </Grid>
          ))}
        </Grid>
      </>
      )
    }
      return (<>No 成语 for {media}</>)
  }
  return (
    <>
      <IdiomContent />
    </>
  );
}
