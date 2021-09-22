import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTenses,
  selectTensesStatus,
  getTenses
} from './tensesSlice';
import {
  Link,
  useHistory
} from "react-router-dom";
import  Spinner  from '../spinner/Spinner';
import {selectLanguage} from '../language/languageSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Tenses() {
  const language = useSelector(selectLanguage);
  const history = useHistory()
  const dispatch = useDispatch();
  const tenses = useSelector(selectTenses);
  const status = useSelector(selectTensesStatus);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    history.push('/tenses')
    dispatch(getTenses(language))
  }, [dispatch, history]);

  function Lines() {
    return (
      <>
        <Grid container spacing={1}>
        {tenses.map((tense, i) => (
          <Grid item xs={6} key={ Math.random().toString(36).substr(2, 9) }>
            <Link to={`/tenses/${tense}?language=${language}`} >{tense}</Link>
          </Grid>
          ))}
        </Grid>
      </>
    )
  }
  return (
    <Container>
    <p>
      Tenses
    </p>
      {status.match('idle') ? <Lines/> : <Spinner />}

    </Container>
  );
}
