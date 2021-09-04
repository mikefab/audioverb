import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchIdioms(lng) {
  return new Promise((resolve, reject) => {
    axios.get(base + `idioms/${lng.toLowerCase()}`)
      .then(res => {
        console.log(res.data)
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchIdiomsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'nam/' + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
