import React from 'react';
import {
  Link,
  useLocation
} from "react-router-dom";


export function CrumbLink(props) {
    const {conjugation, media, phrase, tense, verb} = props
    console.log(props)
    console.log(phrase, '!!!')
    const location = useLocation();
    if (typeof tense !== 'undefined')  {
      return(<span className='crumbs'><Link to={`/tenses/`}>tenses</Link> / <Link to={`/tenses/${tense}`}>{tense}</Link> / <Link to={`/tenses/${tense}/${verb}`}>{verb}</Link> / <Link to={`/tenses/${tense}/${verb}/${conjugation}`}>{conjugation}</Link></span>)
    } else if ((!!phrase)) {
      return (<span className='crumbs'><Link to={`/search?phrase=${phrase}`}>search:  {phrase}</Link></span>)
    } else if (location.pathname.match('favorite')) {
      return (<span className='crumbs'><Link to={`/favorites/`}>favorites</Link></span>)
    } else if (location.pathname.match('medias')) {

      return (<span className='crumbs'><Link to={`/medias/`}>medias</Link> / <Link to={`/media/${media}`}>{media} </Link></span>)
    }
      return (<span className='crumbs'><Link to={`/medias/`}>medias</Link> / <Link to={`/media/${media}`}>{media}</Link> / <Link to={`/media/${media}/${verb}/${conjugation}`}>{verb}</Link> / <Link to={`/media/${media}/${verb}/${conjugation}`}>{conjugation}</Link></span>)
  }
