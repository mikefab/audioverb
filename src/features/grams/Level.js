import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
export function Level(props) {
  const {grams} = props
  return (
    <>
    <Container>
      <Grid container spacing={1}>
      {(grams).map((gram, i) => (
        <Grid item xs={2} key={ i }>
          {gram}
        </Grid>
        ))}

      </Grid>
    </Container>
    </>
  );
}
