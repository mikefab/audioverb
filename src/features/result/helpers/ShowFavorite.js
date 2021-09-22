import React, {useEffect, useState} from 'react';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
const language = localStorage.getItem('language')
export function ShowFavorite(props) {
  const {media, num, result} = props

  useEffect(() => {
    const favorited_key = getFavoritedKey(media, num)
    if (!!favorited_key) {
      setFavorited(1)
    } else {
      setFavorited(0)
    }
  }, [media, num]);

  function isAlreadyFavorited(media_num) {

  }

  function getFavoritedKey(media, num) {
    return Object.keys(localStorage).find(key => {
      return key.match(media + '\\^' + num)
    })
  }
  const alreadyFavorited = isAlreadyFavorited(media, num)
  // Hack to rerender page when user toggles favorite
  const [favorited, setFavorited] = useState(alreadyFavorited ? 1 : 0);

  function handleLike() {
    const cap = result.find(c => { return parseInt(c.num) === parseInt(num)})
    // User is unfavoriting
    if (favorited === 1) {
      const favorited_key = getFavoritedKey(media, num)
      localStorage.removeItem(favorited_key)
      return setFavorited(0)
    }
    // This is fine
    localStorage.setItem('favorite-' + language + '-' + Date.now() + '^' + media.replace(/_/g, ' ') + '^' + num, cap.cap);
    setFavorited(1)
  }


  if (!favorited) {

    return(<span><FavoriteBorder onClick = {() => handleLike()}/></span>)
  }

  return (<span><Favorite onClick = {() => handleLike()} /></span>)
}
