import React from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";
import Next from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

export function PrevNextLink(props) {
    const {conjugation, direction, media, num, phrase, verb, language} = props
    const location = useLocation();

    function addPharse() {
      if (!!phrase) {
        return `?phrase=${phrase}&language=${language}`
      }
      return ''
    }


    if (!!phrase)  {
      if (direction === 'prev') {
        return (<Link to={`/search/${media}/${num}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/search/${media}/${num}${addPharse()}`}><Next /></Link>)
    } else if (location.pathname.match('favorite')) {
      if (direction === 'prev') {
        return (<Link to={`/favorite/${media}/${num}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/favorite/${media}/${num}${addPharse()}`}><Next /></Link>)
    } else if (location.pathname.match('medias')) {
      if (direction === 'prev') {
        return (<Link to={`/medias/${media}/${num}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/medias/${media}/${num}${addPharse()}`}><Next /></Link>)
    }
    if (direction === 'prev') {
      return (<Link to={`/media/${media}/${verb}/${conjugation}/${parseInt(num)}?language=${language}`}> <NavigateBefore/> </Link>)
    }
    return (<Link to={`/media/${media}/${verb}/${conjugation}/${parseInt(num)}?language=${language}`}> <Next/> </Link>)
}
