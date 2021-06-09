import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResults, selectResults, setSelectedResult } from './resultsSlice';

import { getAudio } from '../player/playerSlice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  useParams
} from "react-router-dom";
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    fontSize: 14,
  },

  title: {
    fontSize: 14,
  },

});


export function Results(props) {
  const dispatch = useDispatch();
  const {conjugation} = props
  let results = useSelector(selectResults);
  if (!conjugation) {
    results = []
  }

  const classes = useStyles();
  const { tense, verb } = useParams();
  useEffect(() => {
    dispatch(getResults(conjugation))


  }, [conjugation, dispatch]);

  function handlePlay(cap) {
    dispatch(getAudio(cap))
    dispatch(setSelectedResult(cap))
  }

  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >

          {results.map((result, i) => (
            <div key={i} className={classes.root} >

                    <Typography variant="h5" component="h2">
                      {result.name}
                    </Typography>

                    {result.children.map((cap, i2) => (
                      <div key={i2+1000} >
                          <Grid container>
                            <Grid item xs={1} onClick={() => handlePlay(cap)}>
                              *
                            </Grid>
                            <Grid item xs={11}>
                              <Link style={{textDecoration: 'none'}} to={`/tenses/${tense}/${verb}/${conjugation}/${cap.name.name.replace(/\s+/g, '_')}/${cap.num}`} >{cap.cap}</Link>
                            </Grid>
                          </Grid>
                          </div>
                      ))}


                </div>
            ))}
    </Container>
  );
}
