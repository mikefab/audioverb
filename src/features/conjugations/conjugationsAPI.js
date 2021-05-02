import axios from 'axios';
const base = 'http://localhost:5000/'

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
