import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTenses,
  getTenses
} from './tensesSlice';
import {
  Link,
  useHistory
} from "react-router-dom";
import {selectLanguage} from '../language/languageSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Tenses() {
  const language = useSelector(selectLanguage);
  const history = useHistory()
  const dispatch = useDispatch();
  const tenses = useSelector(selectTenses);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    history.push('/tenses')
    dispatch(getTenses(language))
  }, [dispatch, history]);

  return (
    <Container>
    <p>
      Tenses
    </p>
      <Grid container spacing={1}>
      {tenses.map((tense, i) => (
        <Grid item xs={6} key={ Math.random().toString(36).substr(2, 9) }>
          <Link to={`/tenses/${tense}?language=${language}`} >{tense}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}
