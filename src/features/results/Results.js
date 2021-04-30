import React, { } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from '../Features.module.css';
import { selectResults } from './resultsSlice';
import { getAudio } from '../player/playerSlice';

export function Results() {
  const dispatch = useDispatch();
  const results = useSelector(selectResults);

  return (
    <div className="container">
      <div className={styles.row}>
        <div className="container">
          {results.map((result, i) => (
              <div
                key={i}
                className={styles.row}
                onClick={() => dispatch(getAudio(result))}
                >
                {result[5]}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
