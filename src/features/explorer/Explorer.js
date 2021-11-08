import React from 'react';
import {
  useHistory
} from "react-router-dom";


export function Explorer() {

  const history = useHistory()
  const language = localStorage.getItem("language")

  if (language.match(/Chinese/i)) {
    history.push('/HSK')
    return (<></>)
  }

  history.push('/medias')
  return (<></>)
}
