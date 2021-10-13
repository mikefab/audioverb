export default function track_history(media_view, num) {
  const media_key = num ? `/medias/${media_view}/${num}` : media_view[0]
  const temp_item = localStorage.getItem(media_key)
  localStorage.setItem(media_key, (temp_item ? parseFloat(temp_item) + 0.5 : 0.5))
}
