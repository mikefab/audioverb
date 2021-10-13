import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPrepositions,
  getPrepositions,
  getPrepositionsByMedia
} from './prepositionsSlice';
import {selectLanguage} from '../language/languageSlice';

import {
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';

export default function Prepositions(props) {
  const {media} = props
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();

  const prepositions = useSelector(selectPrepositions);
  useEffect(() => {
    if (media) {
      return dispatch(getPrepositionsByMedia(media))
    }

    dispatch(getPrepositions(language))
  }, [dispatch, language, media]);

  function Content() {
    if (prepositions.length > 0) {
      return (
        <>
          <p>
            <strong>
              Prepositions
            </strong>
          </p>
        <Grid container spacing={1} style={{fontSize: '14px'}}>
        {prepositions.map((preposition, i) => (
          <Grid item xs={3} key={ Math.random().toString(36).substr(2, 9) }>
            <Link to={`/search?phrase=${preposition}`}>{preposition}</Link>
          </Grid>
          ))}
        </Grid>
      </>
      )
    }
      return (<>No prepositions for {media}</>)
  }
  return (
    <>
      <Content />
    </>
  );
}
