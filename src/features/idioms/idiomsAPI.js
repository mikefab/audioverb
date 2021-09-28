import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchYu(kind) {
  return new Promise((resolve, reject) => {
    axios.get(base + `yu/${kind}`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchYuByMedia(kind, media) {
  return new Promise((resolve, reject) => {
    axios.get(base + `yu/${kind}/media/` + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
