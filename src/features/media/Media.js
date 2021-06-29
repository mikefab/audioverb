import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCapsByMedia,
  selectVerbsByMedia,
  getVerbsByMedia,
  getCapsByMedia
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
  const caps = useSelector(selectCapsByMedia);
  useEffect(() => {
    dispatch(getCapsByMedia(media))
    dispatch(getVerbsByMedia(media))
  }, [dispatch, media]);

  return (
    <Container>
      <p>
        <b>{media}</b>
      </p>
      <Grid container spacing={1}>
      {caps.map((cap, i) => (
        <Grid item xs={12} key={ Math.random().toString(36).substr(2, 9) }>
          <Link to={`/medias/${media}/${cap.num}`}>{cap.cap}</Link>
        </Grid>
        ))}
      </Grid>
    </Container>
  );
}
