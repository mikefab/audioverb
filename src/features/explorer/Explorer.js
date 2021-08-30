import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { Tenses } from '../tenses/Tenses';
import { Language } from '../language/Language';
import { Medias } from '../medias/Medias';
import  Grams  from '../grams/Grams';
import {selectState} from './explorerSlice';

export function Explorer() {
  const state = useSelector(selectState);
  const language = localStorage.getItem("language")
  return (
    <>
      {language === null ? <Language/> : ( language.match('Chinese') ? <Grams /> : <Medias/>)}
    </>
  );
}
