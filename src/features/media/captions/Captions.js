import React, {useEffect} from 'react';

import  Spinner  from '../../spinner/Spinner';
import {
  Link,
  useParams
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green } from '@material-ui/core/colors';

export default function Captions(props) {
  const {media, caps, cuts, status} = props

  useEffect(() => {

  }, [status]);

  function color_balls(num) {
    console.log(cuts[parseInt(num)])
    return cuts[parseInt(num)] ? 'primary' : 'error'
  }
  console.log(cuts)
  function Lines() {
    return (
      <Grid container spacing={1}>
      {caps.map((cap, i) => (
        <Grid item xs={12} key={ Math.random().toString(36).substr(2, 9) }>
          <Grid container>
            <Grid item xs={1}>
              <FiberManualRecordIcon color={color_balls(cap.num)} />
            </Grid>
            <Grid item xs={11}>
              <Link to={`/medias/${media}/${cap.num}`}>{cap.cap}</Link>
            </Grid>
          </Grid>
        </Grid>
        ))}
      </Grid>
    )
  }
  return (
    <Container>
      <p>
        <b>{media}</b>
      </p>
      {status.match('idle') ? <Lines/> : <Spinner />}
    </Container>
  );
}
