import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../Features.module.css';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import Grid from '@material-ui/core/Grid';
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
      <div >
        <div className={styles.row}>
          <form onSubmit={_onSubmit}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <TextField
                  onKeyPress={(ev) => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === 'Enter') {
                      // Do code here
                      dispatch(getResults(query))
                    }
                  }}
                  aria-label="Type query"
                  value={query}
                  variant='filled'
                  color="primary"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                  onClick={() => dispatch(getResults(query))}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
  );
}
