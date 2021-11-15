import axios from 'axios';
import env from "react-dotenv";
const base = env.REACT_APP_HOST

export function fetchResult(obj) {
  const {media, num, direction} = obj
  return new Promise((resolve, reject) => {
    let url = base + `caps/${media}/${num}/2`
    // if (direction) {
    //   url += '?direction=' + direction
    // }
    axios.get(url)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}

export function fetchNeighborNums(obj) {
  const {media, num, direction} = obj
  return new Promise((resolve, reject) => {
    let url = base + `caps/neighbors/${media}/${num}`
    axios.get(url)
      .then(res => {
        return resolve({
          data: res.data
        })
      }).catch(console)
  })
}
