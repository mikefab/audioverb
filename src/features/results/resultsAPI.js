import axios from 'axios';
import env from "react-dotenv";
import available_languages from '../language/available_languages'
const base = env.REACT_APP_HOST

const langs = available_languages()

export function fetchResults(query) {

  const lang = localStorage.getItem('language')
  if (query === undefined) {
    console.log('ending path')
    return
  }
  return new Promise((resolve, reject) => {
    axios.get(base + 'search/' + langs[lang] + '/' + query)
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

export function fetchResultsByMedia(query, media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'search/spa/' + media + '/' + query)
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
