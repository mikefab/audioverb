import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getConjugation, selectConjugation} from '../conjugation/conjugationSlice';
// import { selectConjugations, getConjugations } from '../conjugations/conjugationsSlice';

import { Results } from '../results/Results';
import { Player } from '../player/Player';
import {
  getResults
} from '../results/resultsSlice';

import {
  Link,
  useParams
} from "react-router-dom";

import Container from '@material-ui/core/Container'

export function Conjugation() {
  const { conjugation } = useParams();
  const { tense, verb } = useParams();

  const dispatch = useDispatch();
  const instances = useSelector(selectConjugation);
  if (instances.length > 0) {
     // dispatch(getResults(instances[0]))
  }
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // dispatch(getConjugations(tense))
    // Update the document title using the browser API

    dispatch(getConjugation([tense, verb]))

    // dispatch(getResults(instances))
  }, [conjugation]);

  function add_comma(i) {
    if (instances.length -1 === i) {
      return ''
    }
    return ','
  }

  return (
    <Container style={{height: '40px'}}>
    <Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}/`}>{tense}</Link> / <b>{conjugation}</b>
    <br />
    <br />
    {instances.map((instance, i) => (
        <span
          key = {i}
          style={{ fontSize: '14px', cursor: 'pointer', paddingLeft: '5px'}}
        >
          <span onClick={() => dispatch(getResults(instance))}>
            <i>{instance}</i>
          </span>
          {add_comma(i)}
        </span>
      ))}
      <br />
      <Player />
      <Results />
    </Container>
  );
}
