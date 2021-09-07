import axios from 'axios';
import env from "react-dotenv";

const base = env.REACT_APP_HOST

export function fetchVerbsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'verbs_for_name/' + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchCapsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'nam/' + media)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchCutsByMedia(media) {
  return new Promise((resolve, reject) => {
    axios.get(base + 'cuts/' + media)
      .then(res => {
        const obj = res.data.cuts.reduce((h, e) => {
          h[e.num] = {
            start: e.start,
            stop: e.stop
          };
          return h;
        }, {})
        return resolve({
          data: obj
        })
      }).catch(console)
  })
}
