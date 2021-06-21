import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getConjugationsMedia, selectConjugationsByTense} from '../verb/verbSlice';
import { Results } from '../results/Results';
import Chip from '@material-ui/core/Chip';

import {
  Link,
  useParams,
  useHistory
} from "react-router-dom";

import Container from '@material-ui/core/Container'

export function VerbMedia() {
  let history = useHistory();

  let {media, verb, conjugation } = useParams();

  const dispatch = useDispatch();

  const conjugations = useSelector(selectConjugationsByTense);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(getConjugationsMedia([media, verb]))

  }, [dispatch, media, verb, conjugation]);


  function handleClick(instance) {
    history.push(`/media/${media}/${verb}/${instance.replace(',', '')}`)
  }

  // This is a hack until I improve conjugation matching algorithms
  const ary = Object.keys(conjugations).reduce((ary, k) => {
    conjugations[k].forEach(e => {
      ary.push(e)
    })
    return ary
  }, [])
  let unique = [ ...new Set(ary)]
  if (unique.length === 1) {
    unique = []
  }
  function handleVariant(instance) {
    if (conjugation === instance) {
      return 'default'
    }
    return 'outlined'
  }
  return (
    <Container >
      <span className='crumbs'>
        <Link to={`/medias/`}>media</Link> / <Link to={`/media/${media}`}>{media}</Link> / <b>{verb}</b> / <b>{conjugation}</b>
      </span>
      <br />
      <br />

      {unique.map((instance, i) => (
                <span key = {i} style={{paddingLeft: '5px'}}>
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
  <br />
  <br />

      <Results media={media} verb={verb} conjugation={conjugation} />
    </Container>
  );
}
