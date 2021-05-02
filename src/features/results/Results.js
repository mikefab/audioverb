import React, { } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectResults } from './resultsSlice';
import { getAudio } from '../player/playerSlice';
import Container from '@material-ui/core/Container'


export function Results() {
  const dispatch = useDispatch();
  const results = useSelector(selectResults);

  return (
    <Container style={{height: '200px', overflow: 'auto'}} >
          {results.map((result, i) => (
              <div style={{fontSize:'14px'}}
                key={i}
                onClick={() => dispatch(getAudio(result))}
                >
                {result[5]}
              </div>
            ))}
    </Container>
  );
}
