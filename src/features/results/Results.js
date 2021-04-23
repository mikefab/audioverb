import React, { } from 'react';
import { useSelector } from 'react-redux';
import styles from '../Features.module.css';
import {
  selectResults
} from './resultsSlice';

export function Results() {
  const results = useSelector(selectResults);

  return (
    <div className="container">
      <div className={styles.row}>
        <div className="container">
          {results.map((r, i) => (
              <div key={i} className={styles.row}>
                {r[1]}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
