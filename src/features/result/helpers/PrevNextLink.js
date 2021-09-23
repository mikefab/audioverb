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
      const amount = direction === 'prev' ? parseInt(num) - 1 : parseInt(num) + 1
      if (direction === 'prev') {
        return (<Link to={`/search/${media}/${amount}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/search/${media}/${amount}${addPharse()}`}><Next /></Link>)
    } else if (location.pathname.match('favorite')) {
      const amount = direction === 'prev' ? parseInt(num) - 1 : parseInt(num) + 1
      if (direction === 'prev') {
        return (<Link to={`/favorite/${media}/${amount}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/favorite/${media}/${amount}${addPharse()}`}><Next /></Link>)
    } else if (location.pathname.match('medias')) {
      const amount = direction === 'prev' ? parseInt(num) - 1 : parseInt(num) + 1
      if (direction === 'prev') {
        return (<Link to={`/medias/${media}/${amount}${addPharse()}`}><NavigateBefore /></Link>)
      }
      return (<Link to={`/medias/${media}/${amount}${addPharse()}`}><Next /></Link>)
    }
    if (direction === 'prev') {
      return (<Link to={`/media/${media}/${verb}/${conjugation}/${parseInt(num) - 1}?language=${language}`}> <NavigateBefore/> </Link>)
    }
    return (<Link to={`/media/${media}/${verb}/${conjugation}/${parseInt(num) + 1}?language=${language}`}> <Next/> </Link>)
}
