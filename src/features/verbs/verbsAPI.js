import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchVerbs(lng) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'verbs/' + lng)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchVerbsByTense(obj) {
  const {mood, tense, language} = obj
  const url = base + 'mood/' + mood + '/tense/' + tense + '?language=' + language
  console.log(url)
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchVerbsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'verbs_for_name/' + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
