import axios from 'axios';
const base = 'http://localhost:5000/'

export function fetchResults(query) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'search/spa/el%20clan/' + query)
      .then(res => {
        if (res.data.children.length === 0) {
          resolve([])
        }

        let results = []
        let ary = []

        if (res.data.children.length > 0) {
          results = res.data.children[0].children;
          ary = Object.keys(results).map(k => {
            delete results[k].name
            return Object.values(results[k])
          },
            [])

        }
        console.log(ary, "****")
        return resolve({
          data: ary
        })
      }).catch(console)
  })
}
