import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from '../Features.module.css';
import { selectTenses, getTenses } from './tensesSlice';

import Container from '@material-ui/core/Container'


export function Tenses() {
  const dispatch = useDispatch();
  const tenses = useSelector(selectTenses);
  window.z = tenses
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getTenses('spanish'))
  }, []);

  return (
    <Container style={{maxHeight: 500, overflow: 'auto'}}>
      {tenses.map((tense, i) => (
          <div>
            {tense}
          </div>
        ))}

    </Container>
  );
}
