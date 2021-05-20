import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

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
