import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.css';
import {
  getResults2,
  selectResults
} from './searchSlice';

export function Search() {
  const results = useSelector(selectResults);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const _onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="container">
      <div className={styles.row}>
        <form onSubmit={_onSubmit}>
          <input
            className={styles.textbox}
            aria-label="Type query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={() => dispatch(getResults2(query))}
          >
            Send
          </button>
        </form>
      </div>
      <div className={styles.row}>
        <div className="container">
          {results.map(r => (
              <div className={styles.row}>
                {r[1]}
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
