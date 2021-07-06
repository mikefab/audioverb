import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchAudio(obj) {
  const r = obj.record
  const trim_or_extend = obj.trim_or_extend

  let start = r.start
  let stop = r.stop
  const name = r.nam.nam ? r.nam.nam.replace(/\s+/g, '_') : r.nam
  const num = r.num
  const cut_key = 'cut-' + name + '-' + r.num
  if (!trim_or_extend && localStorage[cut_key]) {
    start = localStorage[cut_key].split('-')[0]
    stop = localStorage[cut_key].split('-')[1]
  }


  // URL to concat mp3s
  const createAudioURL = base + 'combine/mp3/movies/' +
  name +
  '/' +
  +
  num +
  '/' +
  start.toString().replace('.', '_') +
  '/' +
  stop.toString().replace('.', '_') +
  '.mp3'
  // URL to complete clip
  let audioURL = base + 'mp3/movies/' +
  name +
  '/' +
  start.toString() +
  '~' +
  stop.toString() +
  '_' + name +
  '.mp3?num=' + num
  return new Promise((resolve, reject) => {
    axios.get(createAudioURL)
      .then(res => {
        return resolve({
          data: audioURL
        })
      }).catch(console)
  })
}
