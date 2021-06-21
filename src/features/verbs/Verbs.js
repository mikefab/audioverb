import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVerbs, selectVerbs} from '../verbs/verbsSlice';
import {selectExplanations} from '../tenses/tensesSlice';
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

  const tense_explanation = useSelector(selectExplanations);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    history.push(location.pathname)
    // Update the document title using the browser API
    dispatch(setTense(tense))
    dispatch(getVerbs(tense))
  }, [tense, dispatch, history, location.pathname]);

  return (
    <Container>
    <span className='crumbs'>
      <Link to='/tenses'>tenses</Link>  - {tense}
    </span>
    <p style={{fontSize: 14}}>
      <i>
        {tense_explanation[tense]}
      </i>
    </p>

      <Grid container spacing={1}>
      {Object.keys(verbs).map((verb, i) => (
        <Grid item xs={6} key={ i }>
          <Link to={`/tenses/${tense}/${verb}/${verbs[verb][0]}`}>{verb}</Link>
        </Grid>
        ))}

      </Grid>
    </Container>
  );
}
export default Verbs;
