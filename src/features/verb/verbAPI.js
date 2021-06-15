import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchConjugations(tense, verb) {
  return new Promise((resolve, reject) => {
    const url = base + 'tense/' + tense + '/verb/' + verb
    axios.get(url)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}


export function fetchConjugationsMedia(media, verb) {
  return new Promise((resolve, reject) => {
    const url = base + 'verb_for_name/' + media + '/'+ verb
    axios.get(url)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
