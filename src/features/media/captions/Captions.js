import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCapsByMedia,
  getCapsByMedia
} from '../mediaSlice';
import {
  Link,
  useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'

export default function Captions(props) {
  const dispatch = useDispatch();
  const { media } = useParams();
  const caps = useSelector(selectCapsByMedia);
  useEffect(() => {
    dispatch(getCapsByMedia(media))
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
