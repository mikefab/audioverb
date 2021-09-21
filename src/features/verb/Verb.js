import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getConjugations, selectConjugations} from '../verb/verbSlice';
import {selectLanguage} from '../language/languageSlice';
import { Results } from '../results/Results';
import Chip from '@material-ui/core/Chip';

import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";

import Container from '@material-ui/core/Container'

export function Verb() {
  const language = useSelector(selectLanguage);
  let history = useHistory();

  let { tense, verb, conjugation } = useParams();

  const dispatch = useDispatch();

  let conjugations = useSelector(selectConjugations);



  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(getConjugations({
      verb,
      tense,
      language
    }))

  }, [dispatch, tense, verb]);


  function handleClick(instance) {
    if (tense) {
      history.push(`/tenses/${tense}/${verb}/${instance}`)
    } else {
      history.push(`/verb/${verb}/${instance}`)
    }

  }
  function handleVariant(instance) {
    if (conjugation === instance) {
      return 'default'
    }
    return 'outlined'
  }
  function SmartLink() {
      if (tense && tense != 'undefined') {
        return (
          <span className='crumbs'><Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <b>{verb}</b> / <b>{conjugation}</b></span>
        )
      }
      return (
        <span className='crumbs'><Link to={`/verbs/`}>verbs</Link> </span>
      )
  }
  return (
    <Container >
      <SmartLink />
      <br />
      <br />
        <span style={{maxWidth: 300, minHeight:1300}}>
          {conjugations.map((instance, i) => (
          <span
            key = {i}
            style={{paddingLeft: '5px'}}
          >
          <Chip
            variant={handleVariant(instance)}
            size="small"
            onClick={() => handleClick(instance)}
            label={instance}
            clickable
            color="primary"
          />
          </span>
      ))}
              </span>
      <br />
      <br />

      <Results conjugation={conjugation} />
    </Container>
  );
}
