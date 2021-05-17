import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setConjugation} from '../conjugation/conjugationSlice';
import { selectTense} from '../tenses/tensesSlice';
import { selectConjugations } from '../conjugations/conjugationsSlice';
import { selectConjugation} from './conjugationSlice';
import { Results } from '../results/Results';
import { Player } from '../player/Player';
import {
  getResults
} from '../results/resultsSlice';

import {
  Link,
  useLocation,
  useHistory,
  useParams
} from "react-router-dom";

import Container from '@material-ui/core/Container'

export function Conjugation() {
  const location = useLocation()
  const history = useHistory()
  const { conjugation } = useParams();
  const dispatch = useDispatch();
  const conjugations = useSelector(selectConjugations);
  const tense = useSelector(selectTense);
  let instances = []
  if (conjugations[conjugation]) {
    instances = conjugations[conjugation]
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    dispatch(setConjugation(conjugation))
    dispatch(getResults(instances[0]))
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
