import React, {useEffect} from 'react';
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
    // Update the document title using the browser API
    if (Object.keys(tenses).length === 0) {
      dispatch(getTenses(language))
      dispatch(setTenseLanguage(language))
    } else {
      if ( language !== tense_language) {
        dispatch(getTenses(language))
        dispatch(setTenseLanguage(language))
      }
    }
  });

  function Hyphen(props) {
    const {mood, tenses} = props
    if (!tenses) {
      return (
        <></>
      )
    }
    if (tenses.length === 1 && mood === tenses[0]) {
      return (
        <></>
      )
    }
    return (
      <>-</>
    )
  }

  function Mood(props) {
    const {mood, tenses} = props

    if (!tenses) {
      return (
        <>...</>
      )
    }

    if (tenses.length === 1 && mood === tenses[0]) {
      return (
        <></>
      )
    }
    return (
      <><b>{mood}</b></>
    )
  }

  function Lines2() {
    return (
      <>
      <Container>
        <Grid container spacing={12}>
        {Object.keys(tenses).map((mood, i) => (
          <Grid item xs={6} key={ i }>
            <p>
              <b><Mood mood={mood} tenses={tenses[mood]} /></b>
              <br/>
              {tenses[mood].map((tense, i) => (
                <Grid item xs={12} key={ Math.random().toString(36).substr(2, 9)} style={{fontSize: '14px'}}>
                  <Hyphen mood={mood} tenses={tenses[mood]} /> <Link to={`/tenses/${tense}?language=${language}`} >{tense}</Link>
                </Grid>
              ))}
            </p>
          </Grid>
          ))}
        </Grid>
      </Container>
      </>
    )
  }

  return (
    <Container>
    <p>
      Tenses
    </p>
      {status.match('idle') ? <Lines2/> : <Spinner />}

    </Container>
  );
}
