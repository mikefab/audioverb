import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIdioms,
  getIdioms,
  getIdiomsByMedia
} from './idiomsSlice';
import {selectLanguage} from '../language/languageSlice';

import {
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export default function Idioms(props) {
  const {media} = props
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const idioms = useSelector(selectIdioms);
  useEffect(() => {
    if (media) {
      return dispatch(getIdiomsByMedia(media))
    }

    dispatch(getIdioms(language))
  }, [dispatch, language, media]);

  function IdiomContent() {
    if (idioms.length > 0) {
      return (
        <>
          <p>
            <strong>
              Idiomatic expressions
            </strong>
          </p>
        <Grid container spacing={1} style={{fontSize: '14px'}}>
        {idioms.map((idiom, i) => (
          <Grid item xs={3} key={ Math.random().toString(36).substr(2, 9) }>
            <Link to={`/search?is_idiom=true&phrase=${idiom}`}>{idiom}</Link>
          </Grid>
          ))}
        </Grid>
      </>
      )
    }
      return (<>No idioms for {media}</>)
  }
  return (
    <>
      <IdiomContent />
    </>
  );
}
