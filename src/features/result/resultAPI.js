import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchResult(name, num) {
  return new Promise((resolve, reject) => {
    axios.get(base + `caps/${name}/${num}/2`)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
