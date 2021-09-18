import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchGrams(obj) {
  const {level, media} = obj
  const media_name = media ? media : 'all'
  return new Promise((resolve, reject) => {
    console.log(base + `level/2/${level}/chi_hans/${media_name}`)
    axios.get(base + `level/2/${level}/chi_hans/${media_name}`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
