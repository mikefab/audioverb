import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectConjugations} from './conjugationsSlice';
import { setConjugation} from '../conjugation/conjugationSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Conjugations() {
  const dispatch = useDispatch();
  const conjugations = useSelector(selectConjugations);
  return (
    <Container style={{height: 300, overflow: 'auto'}}>
      <Grid container spacing={1}>
      {Object.keys(conjugations).map((conjugation, i) => (
        <Grid item xs={6} key={ i }>
          <div
            style={{ fontSize: '14px', cursor: 'pointer'}}
            onClick={(e) => dispatch(setConjugation(conjugation))}
          >
            {conjugation}
          </div>
        </Grid>
        ))}

      </Grid>
    </Container>
  );
}
