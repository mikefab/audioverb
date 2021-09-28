import React, {useEffect} from 'react';
import { } from 'react-redux';

import {
  Link,
  useHistory
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Favorites() {
  const history = useHistory()
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    history.push('/favorites')
  }, [ history]);
  const language = localStorage.getItem('language')
  var re = new RegExp('favorite-' + language, 'g');

  return (
    <>
    <p>
      <strong>
        Favorites
      </strong>
    </p>
    <Container>
      <Grid container spacing={1}>
      {Object.keys(localStorage).filter(item => { return item.match(re)}).reverse().map((key, i) => (
        <Grid item xs={12} key={ Math.random().toString(36).substr(2, 9) }>
          * <Link to={`/favorite/${key.split('^')[1].replace(/_/g, ' ')}/${key.split('^')[2]}`} >{localStorage.getItem(key)}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
