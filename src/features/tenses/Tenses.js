import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectTenses, getTenses } from './tensesSlice';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Tenses() {
  const dispatch = useDispatch();
  const tenses = useSelector(selectTenses);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getTenses('spanish'))
  }, []);

  return (
    <Container style={{height: 500, overflow: 'auto'}}>
      <Grid container spacing={2}>
      {tenses.map((tense, i) => (
        <Grid item xs={6}>
          {tense}
        </Grid>
        ))}

      </Grid>
    </Container>
  );
}
