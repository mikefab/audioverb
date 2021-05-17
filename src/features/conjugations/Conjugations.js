import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectConjugations} from './conjugationsSlice';
import { getConjugations} from '../conjugations/conjugationsSlice';
import {setTense} from '../tenses/tensesSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import {
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

function Conjugations() {
  const history = useHistory()
  const location = useLocation()

  const dispatch = useDispatch();
  const conjugations = useSelector(selectConjugations);

const { tense } = useParams();
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    history.push(location.pathname)
    // Update the document title using the browser API
    dispatch(setTense(tense))
    dispatch(getConjugations(tense))
  }, [tense]);

  return (
    <Container style={{height: 300, overflow: 'auto'}}>
    <Link to='/tenses'>tenses</Link>  - {tense}
      <Grid container spacing={1}>
      {Object.keys(conjugations).map((conjugation, i) => (
        <Grid item xs={6} key={ i }>
          <Link to={`/tenses/${tense}/${conjugation}`}>{conjugation}</Link>
        </Grid>
        ))}

      </Grid>
    </Container>
  );
}
export default Conjugations;
