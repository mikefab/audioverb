import React, { } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectResults } from './resultsSlice';
import { getAudio } from '../player/playerSlice';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Translate from '@material-ui/icons/Translate';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  clickable: {
    fontSize: 14,
    cursor: 'pointer'
  }
});


export function Results() {
  const dispatch = useDispatch();
  const results = useSelector(selectResults);
  const classes = useStyles();
  function handleTranslate(cap) {
    window.open(
      `https://translate.google.com/?sl=es&tl=en&text=${cap}&op=translate`,
      '_blank'
    )
  }
  return (
    <Container  style={{height: '600px', overflow: 'auto'}} >
          {results.map((result, i) => (
            <Card className={classes.root} key={i}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {result.name}
                    </Typography>

                    {result.children.map((cap, i2) => (
                      <div key={i2+1000} >
                        <Paper variant="outlined" elevation={3} className={classes.clickable}
                          key={i2}
                          onClick={() => dispatch(getAudio(cap))}
                          >
                          {cap.cap}

                        </Paper>
                      <Translate key={i2+100} style={{cursor: 'pointer'}} onClick={() => handleTranslate(cap.cap)}/>
                          </div>
                      ))}

                  </CardContent>
                </Card>
            ))}
    </Container>
  );
}
