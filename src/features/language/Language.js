import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip';

import {
  useLocation,
  useHistory
} from "react-router-dom";


import {setLanguage, selectLanguage} from '../language/languageSlice';

export function Language() {

  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const history = useHistory()
  const selectedSyle = {'text-decoration': 'underline'}
  const location = useLocation()
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    console.log('do it!', location.pathname)
    if (!location.pathname.match(/settings/)) {
        history.push('/')
    } else {

    }

  }, [language]);

  function handleVariant(lang) {
    console.log('ssss')
    console.log(!!language)
    if (lang === language) {
      return 'default'
    }
    return 'outlined'
  }
  function handleSelectLangauge(lang) {
    dispatch(setLanguage(lang))
  }

  function showComma(ary, index) {

  }

  return (
    <>
    <Container>
    Choose your language:&nbsp;
    {['Chinese', 'Spanish'].map((lang, i) => (
        <span key={'lang' + i}>
        <span>
        <Chip
          variant={handleVariant(lang)}
          size="small"
          onClick={() => handleSelectLangauge(lang)}
          label={lang}
          clickable
          color="primary"
        />
        </span> &nbsp;
        </span>

      ))}


    </Container>
    </>
  );
}
