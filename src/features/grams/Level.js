import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import {
  Link
} from "react-router-dom";
export function Level(props) {
  const {grams} = props
  const language = localStorage.getItem('language')
  return (
    <>
    <Container>
      <Grid container spacing={12}>
      {(grams).map((gram, i) => (
        <Grid item xs={3} key={ i }>
          <Link style={{textDecoration: 'none'}} to={`/search?phrase=${gram}&language=${language}`} >{gram}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
