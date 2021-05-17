import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchConjugations(tense) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'tense/' + tense)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
