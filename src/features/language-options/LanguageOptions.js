import React, {useState} from 'react';
import { Link } from "react-router-dom";

export function LanguageOptions(props) {
  const {language} = props
  function content() {
    if (!language) {
      return (
        <>
        </>
      )
    }
    if (language.match('Chinese')) {
      return (
        <span>
          Explore <Link to='/grams' >compound expressions</Link> or <Link to='/medias' >captions</Link> from <b>{language}</b> movies.
        </span>
      )
    }
    return (
      <span>
          Explore <Link to='/tenses' >tenses</Link> or <Link to='/medias' >captions </Link> from {language} movies.
      </span>
    )
  }
  return (
    <>
      {content()}
    </>

  );
}
