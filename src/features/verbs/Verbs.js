import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getVerbs,
    getVerbsByTense,
    getVerbsByMedia,
    selectVerbs,
    selectVerbsStatus
  } from '../verbs/verbsSlice';
import {selectExplanations} from '../tenses/tensesSlice';
import {setTense} from '../tenses/tensesSlice';
import {selectLanguage} from '../language/languageSlice';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import  Spinner  from '../spinner/Spinner';

import {
  Link,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";

function Verbs(props) {
  const {media} = props
  const status = useSelector(selectVerbsStatus);
  const history = useHistory()
  const location = useLocation()
  const language = useSelector(selectLanguage);
  const dispatch = useDispatch();
  const verbs = useSelector(selectVerbs);

  const { tense } = useParams();

  const tense_explanation = useSelector(selectExplanations);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    history.push(location.pathname)
    // Update the document title using the browser API
    if (tense) {
      dispatch(setTense(tense))
      dispatch(getVerbsByTense(tense))
    } else if (media) {
      dispatch(getVerbsByMedia(media))
    } else {
      dispatch(getVerbs(language))
    }

  }, [tense, dispatch, history, location.pathname]);

  useEffect(() => {

  }, [status]);

  function Crumbs() {
    if (tense) {
      return (
        <>
        <span className='crumbs'>
          <Link to='/tenses'>tenses</Link>  - {tense}
        </span>
        <p style={{fontSize: 14}}>
          <i>
            {tense_explanation[tense]}
          </i>
        </p>
        </>
      )
    }
    return (
      <>
      </>
    )
  }

  function SmartLink(props) {
    const {verb} =  props

    if (tense) {
      return (
        <>
          <Link to={`/tenses/${tense}/${verb}/${verbs[verb][0]}?language=${language}`}>{verb}</Link>
        </>
      )
    }

    if (media) {

      return (
        <>
          <Link to={`/media/${media}/${verb}/${verbs[verb][0]}?language=${language}`}>{verb}</Link>
        </>
      )
    }
    return(
      <Link to={`/verb/${verb}/${verbs[verb][0]}?language=${language}`}>{verb}</Link>
    )
  }

  function Lines() {
    return (
      <>
      <Container>
        <Crumbs />
        <Grid container spacing={1}>
        {Object.keys(verbs).sort().map((verb, i) => (
          <Grid item xs={4} key={ i }>
            <SmartLink verb={verb}/>
          </Grid>
          ))}

        </Grid>
      </Container>
      </>
    )
  }

  return (
    <Container>
      <p>
        Verbs
      </p>
      {status.match('idle') ? <Lines/> : <Spinner />}
    </Container>
  );
}
export default Verbs;
