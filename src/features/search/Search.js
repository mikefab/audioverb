import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchField from "./searchField"
import { useHistory } from "react-router-dom";
import {
  getResults
} from '../results/resultsSlice';

export function Search() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  return (
      <div >
        <SearchField
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              dispatch(getResults(query))
              history.push(`/search?phrase=${query}`)
            }
          }}
        />
      </div>
  );
}
