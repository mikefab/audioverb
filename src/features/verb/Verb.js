import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getConjugations, selectConjugations} from '../verb/verbSlice';
import { Results } from '../results/Results';
import Chip from '@material-ui/core/Chip';

import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";

import Container from '@material-ui/core/Container'

export function Verb() {
  let history = useHistory();

  let { tense, verb, conjugation } = useParams();

  const dispatch = useDispatch();

  let conjugations = useSelector(selectConjugations);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(getConjugations([tense, verb]))

  }, [dispatch, tense, verb]);


  function handleClick(instance) {
    history.push(`/tenses/${tense}/${verb}/${instance}`)
  }
  function handleVariant(instance) {
    if (conjugation === instance) {
      return 'default'
    }
    return 'outlined'
  }
  return (
    <Container >
      <span className='crumbs'><Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <b>{verb}</b> / <b>{conjugation}</b></span>
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
