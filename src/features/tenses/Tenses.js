import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  selectTenses,
  getTenses,
  setTense
} from './tensesSlice';

import { setExplorerState } from '../explorer/explorerSlice';

import { getConjugations} from '../conjugations/conjugationsSlice';

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
  const handleClick = (tense) => {

    dispatch(getConjugations(tense))
    dispatch(setTense(tense))
    dispatch(setExplorerState(0))
  }

  return (
    <Container style={{height: 200, overflow: 'auto'}}>
      <Grid container spacing={1}>
      {tenses.map((tense, i) => (
        <Grid item xs={6} key={ Math.random().toString(36).substr(2, 9) }>
          <div
            style={{ fontSize: '14px', cursor: 'pointer'}}
            onClick={() => handleClick(tense)}
          >
            {tense}
          </div>
        </Grid>
        ))}

      </Grid>
    </Container>
  );
}
