import React from 'react';
import { Link } from "react-router-dom";
import {nav_options, nav_options_lookup} from '../nav/nav_options_lookup'

export function LanguageOptions(props) {
  const {language} = props
  const options = nav_options()[language] || []
  function SubContent() {
    if (options.length > 0) {
      return (
        <>
        or&nbsp;
        </>
      )
    }
    return(
      <></>
    )

  }

  function content() {
    if (!language) {
      return (
        <>
        </>
      )
    }
      return (
          <>
          Explore &nbsp;
          {options.sort().map((option, i) => (
            <>
              <Link to={`/${option}`} >{nav_options_lookup()[option].toLowerCase()}</Link>,&nbsp;
            </>
            ))}
            <SubContent />
            <Link to='/medias' >captions</Link> from {language} movies.
          </>
      )
  }
  return (
    <>
      {content()}
    </>

  );
}


//         <span>
//          Explore <Link to='/hsk' >compound expressions</Link> or <Link to='/medias' >captions</Link> from <b>{language}</b> movies.
//        </span>
