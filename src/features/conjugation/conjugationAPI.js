import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchConjugation(tense, verb) {
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
