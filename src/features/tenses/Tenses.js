import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTenses,
  selectTensesStatus,
  selectTenseLanguage,
  setTenseLanguage,
  getTenses
} from './tensesSlice';
import {
  Link
} from "react-router-dom";
import  Spinner  from '../spinner/Spinner';
import {selectLanguage} from '../language/languageSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Tenses() {
  const language = useSelector(selectLanguage)
//  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const tenses = useSelector(selectTenses);
  const status = useSelector(selectTensesStatus);
  const tense_language = useSelector(selectTenseLanguage)

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log(tenses.length )
    // Update the document title using the browser API
    if (tenses.length !== 0 && language !== tense_language) {
      dispatch(getTenses(language))
      dispatch(setTenseLanguage(language))
    }
  });

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
      Tenses ...
    </p>
      {status.match('idle') ? <Lines/> : <Spinner />}

    </Container>
  );
}
