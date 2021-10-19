import axios from 'axios';
import env from "react-dotenv";
let base = env.REACT_APP_HOST

export function fetchConjugations(verb, tense, language) {
  return new Promise((resolve, reject) => {
    let url = base
    if (tense) {
      url += 'tense/' + tense + '/verb/' + verb
    } else {
      url += 'conjugations/' + verb + '/' + language
    }
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
