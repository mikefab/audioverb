import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVerns} from './verbsSlice';
import { getVerbs, selectVerbs} from '../verbs/verbsSlice';
import {setTense} from '../tenses/tensesSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import {
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

function Verbs() {
  const history = useHistory()
  const location = useLocation()

  const dispatch = useDispatch();
  const verbs = useSelector(selectVerbs);

const { tense } = useParams();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    history.push(location.pathname)
    // Update the document title using the browser API
    dispatch(setTense(tense))
    dispatch(getVerbs(tense))
  }, [tense]);

  return (
    <Container style={{height: 300, overflow: 'auto'}}>
    <Link to='/tenses'>tenses</Link>  - {tense}
      <Grid container spacing={1}>
      {Object.keys(verbs).map((verb, i) => (
        <Grid item xs={6} key={ i }>
          <Link to={`/tenses/${tense}/${verb}`}>{verb}</Link>
        </Grid>
        ))}

      </Grid>
    </Container>
  );
}
export default Verbs;
