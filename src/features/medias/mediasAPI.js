import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST
export function fetchMedias(language) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'nams/' + language.toLowerCase())
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
