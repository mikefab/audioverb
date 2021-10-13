import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {selectLanguage} from '../language/languageSlice';
import {
  selectMedias,
  getMedias
} from './mediasSlice';
import {
  Link
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Medias() {
  const dispatch = useDispatch();
  const medias = useSelector(selectMedias);
  const language = useSelector(selectLanguage);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getMedias(language))
  }, [language]);

  return (
    <>
    <p>
      <strong>
        Movies
      </strong>
    </p>
    <Container>
      <Grid container spacing={1}>
      {medias.map((media, i) => (
        <Grid item xs={12} key={ Math.random().toString(36).substr(2, 9) }>
          * <Link to={`/media/${media.name}?language=${language}`} >{media.name}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
