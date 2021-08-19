import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {selectLanguage} from '../language/languageSlice';
import {
  selectMedias,
  getMedias
} from './mediasSlice';
import {
  Link,
  useHistory
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Medias() {

  const history = useHistory()
  const dispatch = useDispatch();
  const medias = useSelector(selectMedias);
  const language = useSelector(selectLanguage);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('medias', language)
    // Update the document title using the browser API
    // history.push('/medias')
    dispatch(getMedias(language))
  }, [language]);

  return (
    <Container>
    <p>
      Medias
    </p>
      <Grid container spacing={1}>
      {medias.map((media, i) => (
        <Grid item xs={6} key={ Math.random().toString(36).substr(2, 9) }>
          <Link to={`/media/${media.name}`} >{media.name}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}
