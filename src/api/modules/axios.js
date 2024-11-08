import http from '../http'

/**
 * pageLineData
 */
function getAiPicture(data) {
  return http.get(
    `/db/aiPicture?Action=${data.Action}&Version=${data.Version}&req_key=${data.req_key}&image_urls=${data.image_urls}`
  )
}
export default {
  getAiPicture
}
