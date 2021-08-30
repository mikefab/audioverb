import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import native_languages from './native_languages'

import {
  useLocation,
  useHistory
} from "react-router-dom";



import {setLanguage, selectLanguage} from '../language/languageSlice';
const my_languages = native_languages()

export function Language() {
  const [my_language, setMyLanguage] = useState(localStorage.getItem('my_language') || 'en')
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  console.log(language, 'llll')
  const history = useHistory()
  const selectedSyle = {'text-decoration': 'underline'}
  const location = useLocation()
  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   if (!location.pathname.match(/settings/)) {
  //       history.push('/')
  //   } else {
  //
  //   }
  //
  // }, [language]);

  function handleVariant(lang) {
    if (lang === language) {
      return 'default'
    }
    return 'outlined'
  }
  function handleSelectLangauge(lang) {
    dispatch(setLanguage(lang))
  }

  function handleChange(e) {
    setMyLanguage(e.target.value)
    localStorage.setItem('my_language', e.target.value)
  }

  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <InputLabel id="demo-simple-select-label">Your language</InputLabel>

        <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={my_language}
        onChange={handleChange}
        >
        {Object.keys(my_languages).map((key, index) => (
                <MenuItem key={key} value={my_languages[key]}>{key}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12}>
      Language you wish to practice:&nbsp;
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
        </Grid>
    </Grid>

  );
}
