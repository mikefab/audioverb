import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { Tenses } from '../tenses/Tenses';
import { Language } from '../language/Language';
import {selectState} from './explorerSlice';
import {
  useHistory
} from "react-router-dom";


export function Explorer() {

  const history = useHistory()
  const state = useSelector(selectState);
  const language = localStorage.getItem("language")

  if (language.match(/Chinese/i)) {
    history.push('/HSK')
    return (<></>)
  }

  history.push('/medias')
  return (<></>)
}
