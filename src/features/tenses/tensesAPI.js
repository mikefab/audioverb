import axios from 'axios';
const base = 'http://localhost:5000/'

export function fetchTenses() {
  console.log('asfasfd')
  return new Promise((resolve, reject) => {
    axios.get(base + 'tenses/spanish')
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}