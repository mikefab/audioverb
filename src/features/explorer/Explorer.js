import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tenses } from '../tenses/Tenses';
import { Conjugations } from '../conjugations/Conjugations';
import {selectState} from './explorerSlice';

const modes = ["out-in", "in-out"];
export function Explorer() {
  const state = useSelector(selectState);
  return (
    <>
      {state ? <Tenses /> : <Conjugations />}
    </>
  );
}
