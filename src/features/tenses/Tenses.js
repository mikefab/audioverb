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
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Tenses() {
  const history = useHistory()
  const dispatch = useDispatch();
  const tenses = useSelector(selectTenses);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    history.push('/tenses')
    console.log(history)
    dispatch(getTenses('spanish'))
  }, []);

  return (
    <Container>
    Tenses
      <Grid container spacing={1}>
      {tenses.map((tense, i) => (
        <Grid item xs={6} key={ Math.random().toString(36).substr(2, 9) }>
          <Link to={`/tenses/${tense}`} >{tense}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}
