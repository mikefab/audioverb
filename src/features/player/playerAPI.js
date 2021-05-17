import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchAudio(r) {
  return new Promise((resolve, reject) => {
    const name = r.nam.replace(/\./g, '_')
    // const cap = r[1]
    const start = r.start
    const stop = r.stop
    console.log(name, 'nnn')
    // URL to concat mp3s
    const createAudioURL = base + 'combine/mp3/movies/' +
    name +
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
    '.mp3'

    axios.get(createAudioURL)
      .then(res => {
        return resolve({
          data: audioURL
        })
      }).catch(console)
  })
}
