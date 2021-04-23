import axios from 'axios';
const base = 'http://localhost:5000/'
// A mock function to mimic making an async request for data
export function fetchResults(query) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'search/spa/amorosa%20soledad/' + query)
      .then(res => {
        if (res.data.children.length === 0) {
          resolve([])
        }

        const results = res.data.children[0].children;
        const ary = Object.keys(results).map(k => {
          delete results[k].name
          return Object.values(results[k])
        },
          [])
        return resolve({
          data: ary
        })
      }).catch(console)

  })
}
