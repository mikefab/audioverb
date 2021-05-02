import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectConjugations } from '../conjugations/conjugationsSlice';
import { selectConjugation} from './conjugationSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Conjugation() {
  const conjugations = useSelector(selectConjugations);
  const conjugation = useSelector(selectConjugation);
  let instances = []
  if (conjugations[conjugation]) {
    instances = conjugations[conjugation]
  }

  function add_comma(i) {
    if (instances.length -1 == i) {
      return ''
    }
    return ','
  }
  return (
    <Container>
    {instances.map((instances, i) => (
        <span
          key = {i}
          style={{ fontSize: '14px', paddingLeft: '5px'}}
        >
          <span>
            {instances}
          </span>
          {add_comma(i)}
        </span>

      ))}
    </Container>
  );
}
