import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST + env.REACT_APP_PORT

export function fetchTenses() {
  return new Promise((resolve, reject) => {
    axios.get(base + 'tenses/spanish')
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
