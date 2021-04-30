import React, { } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from '../Features.module.css';
import { selectResults } from './resultsSlice';
import { getAudio } from '../player/playerSlice';
import Container from '@material-ui/core/Container'


export function Results() {
  const dispatch = useDispatch();
  const results = useSelector(selectResults);

  return (
    <Container style={{maxHeight: 500, overflow: 'auto'}}>
          {results.map((result, i) => (
              <div
                key={i}
                onClick={() => dispatch(getAudio(result))}
                >
                {result[5]}
              </div>
            ))}
    </Container>
  );
}
