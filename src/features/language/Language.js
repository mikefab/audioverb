import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getLanguages, selectLanguages, setLanguage, selectLanguage} from './languageSlice';
import {LanguageOptions} from '../language-options/LanguageOptions'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import native_languages from './native_languages'


const my_languages = native_languages()

export function Language() {
  const dispatch = useDispatch();
  const languages = useSelector(selectLanguages);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
      dispatch(getLanguages())
  }, []);


  const [my_language, setMyLanguage] = useState(localStorage.getItem('my_language') || 'en')

  const language = useSelector(selectLanguage);

  function handleVariant(lang) {
    const re = new RegExp(language, 'i');
    if (lang.match(re)) {
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
        <InputLabel id="demo-simple-select-label">Your native language</InputLabel>

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
      <p>
      <Grid container spacing={12} style={{height: '90px'}}>
        {languages.map((lang, i) => (
          <Grid item xs={4} key={ i }>
            <span key={'lang' + i} >
                <Chip
                  variant={handleVariant(lang)}
                  size="small"
                  onClick={() => handleSelectLangauge(lang)}
                  label={lang}
                  clickable
                  color="primary"
                  style={{minWidth:'80px'}}
                />
            </span>
          </Grid>
          ))}
        </Grid>
        </p>
        </Grid>
        <Grid item xs={12} className='casual'>
          <LanguageOptions language={language}/>
        </Grid>

    </Grid>

  );
}
