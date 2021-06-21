import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getConjugationsMedia, selectConjugationsByTense} from '../verb/verbSlice';
import { Results } from '../results/Results';
// import {
//   getResults
// } from '../results/resultsSlice';

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
  const final = unique.map((e, i) => {
    if (i < unique.length - 1) {

      return e + ","
    }
          console.log(e, i, unique.length)
    return e
  })

  return (
    <Container >
      <span className='crumbs'>
        <Link to={`/medias/`}>media</Link> / <Link to={`/media/${media}`}>{media}</Link> / <b>{verb}</b> / <b>{conjugation}</b>
      </span>
      <br />
      <br />
      <p style={{maxWidth: '300px', minHeight: '20px'}}>
      {final.map((instance, i) => (
                <span key = {i} style={{ fontSize: '14px', cursor: 'pointer', paddingLeft: '5px'}} onClick={() => handleClick(instance)}>
                  <i>{instance} </i>
                </span>
        ))}
      </p>

      <Results media={media} verb={verb} conjugation={conjugation} />
    </Container>
  );
}
