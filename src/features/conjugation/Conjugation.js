import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectConjugations } from '../conjugations/conjugationsSlice';
import { selectConjugation} from './conjugationSlice';
import {
  getResults
} from '../results/resultsSlice';
import Container from '@material-ui/core/Container'

export function Conjugation() {
  const dispatch = useDispatch();
  const conjugations = useSelector(selectConjugations);
  const conjugation = useSelector(selectConjugation);
  let instances = []
  if (conjugations[conjugation]) {
    instances = conjugations[conjugation]
  }

  function add_comma(i) {
    if (instances.length -1 === i) {
      return ''
    }
    return ','
  }
  return (
    <Container style={{height: '40px'}}>
    {instances.map((instance, i) => (
        <span
          key = {i}
          style={{ fontSize: '14px', paddingLeft: '5px'}}
        >
          <span onClick={() => dispatch(getResults(instance))}>
            {instance}
          </span>
          {add_comma(i)}
        </span>

      ))}
    </Container>
  );
}
