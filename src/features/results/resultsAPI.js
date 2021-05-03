import axios from 'axios';
const base = 'http://localhost:5000/'

export function fetchResults(query) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'search/spa/' + query)
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
