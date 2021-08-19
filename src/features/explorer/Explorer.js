import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { Tenses } from '../tenses/Tenses';
import { Language } from '../language/Language';
import { Medias } from '../medias/Medias';
import {selectState} from './explorerSlice';

export function Explorer() {
  const state = useSelector(selectState);
  return (
    <>
      {localStorage.getItem("language") === null ? <Language/> : <Medias/>}
    </>
  );
}
