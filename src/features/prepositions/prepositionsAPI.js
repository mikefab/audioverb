import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchPrepositions(lng) {
  return new Promise((resolve, reject) => {
    axios.get(base + `preps/${lng}`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchPrepositionsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + `preps/nam/` + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
