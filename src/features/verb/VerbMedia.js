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

  function add_comma(ary, i) {
    if (ary.length -1 === i) {
      return ''
    }
    return ','
  }

  function handleClick(instance) {
    history.push(`/media/${media}/${verb}/${instance}`)
  }

  // This is a hack until I improve conjugation matching algorithms
  const ary = Object.keys(conjugations).reduce((ary, k) => {
    conjugations[k].forEach(e => {
      ary.push(e)
    })
    return ary
  }, [])
  const unique = [ ...new Set(ary)]

  return (
    <Container >
      <Link to={`/media/`}>media</Link> / <Link to={`/media/${media}`}>{media}</Link> / <b>{verb}</b> / <b>{conjugation}</b>
      <br />
      <br />
      <br />
      {unique.map((instance, i) => (
        <span key = {i} style={{ fontSize: '14px', cursor: 'pointer', paddingLeft: '5px'}}>

              <span onClick={() => handleClick(instance)}>
                <i>{instance}</i>
              </span>
              {add_comma(unique, i)}

          </span>
      ))}

      <Results conjugation={conjugation} />
    </Container>
  );
}


// {Object.keys(conjugations).map((tense, i) => (
//   <span key = {i} style={{ fontSize: '14px', cursor: 'pointer', paddingLeft: '5px'}}>
//     {conjugations[tense].map((instance, i2) => (
//       <span>
//         <span onClick={() => handleClick(instance)}>
//           <i>{instance}</i>
//         </span>
//         {add_comma(i2)}
//       </span>
//   ))}
//     </span>
// ))}
