import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectConjugations} from './conjugationsSlice';
import { selectTense} from '../tenses/tensesSlice';
import { setConjugation} from '../conjugation/conjugationSlice';
import { setExplorerState } from '../explorer/explorerSlice';
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'


export function Conjugations() {
  const dispatch = useDispatch();
  const conjugations = useSelector(selectConjugations);
  const tense = useSelector(selectTense);

  return (
    <Container style={{height: 300, overflow: 'auto'}}>
    <Button
      variant="contained"
      color="primary"
      startIcon={<ArrowBack />}
      onClick={() => dispatch(setExplorerState(true))}

    >{tense}
    </Button>

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
