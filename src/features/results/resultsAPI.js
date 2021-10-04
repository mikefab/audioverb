import axios from 'axios';
import env from "react-dotenv";
import available_languages from '../language/available_languages'
const base = env.REACT_APP_HOST

const langs = available_languages()

function add_param(url, is_idiom) {
  if (is_idiom) {
    url = url + '?is_idiom=true'
  }
  return url
}

export function fetchResults(query, is_idiom) {
  const lang = localStorage.getItem('language')
  if (query === undefined) {
    console.log('ending path')
    return
  }

  return new Promise((resolve, reject) => {
  let url = base + 'search/' + langs[lang] + '/' + query;
  url = add_param(url, is_idiom)
    axios.get(url)
      .then(res => {
        if (res.data.children.length === 0) {
          resolve([])
        }
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchResultsByMedia(query, media, is_idiom) {
  return new Promise((resolve, reject) => {
    let url = base + 'search/media/' + media + '/' + query
    url = add_param(url, is_idiom)
    axios.get(url)
      .then(res => {
        if (res.data.children.length === 0) {
          resolve([])
        }
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
