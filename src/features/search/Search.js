import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../Features.module.css';
import {
  getResults
} from '../results/resultsSlice';

export function Search() {
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
            onClick={() => dispatch(getResults(query))}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
