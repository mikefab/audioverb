import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchGrams(level) {
  return new Promise((resolve, reject) => {
    axios.get(base + `level/2/${level}/chi_hans/all`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
