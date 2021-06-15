import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVerbsByMedia,
  getVerbsByMedia
} from './mediaSlice';
import {
  Link,
  useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export function Media() {
  const dispatch = useDispatch();
  const { media } = useParams();
  const verbs = useSelector(selectVerbsByMedia);
  useEffect(() => {

    dispatch(getVerbsByMedia(media))
  }, [dispatch]);


  return (
    <Container>
      <p>
        <b>{media}</b>
      </p>
      <Grid container spacing={1}>
      {Object.keys(verbs).sort().map((verb, i) => (
        <Grid item xs={6} key={ Math.random().toString(36).substr(2, 9) }>
          <Link to={`/media/${media}/${verb}/${verbs[verb][0]}`}>{verb}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}
