import axios from 'axios'

import { getFullURL } from '@/utils/http'

const instance = axios.create({
  // Web 侧可以通过 vite.config.js 中的 proxy 配置，指定代理
  // 小程序APP里需写完整路径，如 https://cmdb.weiletest.com
  // 可使用条件编译,详见 https://uniapp.dcloud.io/tutorial/platform.html#preprocessor
  // #ifdef H5
  baseURL: import.meta.env.VITE_APP_AXIOS_BASE_URL,
  // #endif
  // #ifndef H5
  // eslint-disable-next-line no-dupe-keys
  // baseURL: 'http://192.168.117.163:8090',
  // #endif
  adapter(config) {
    console.log('request adapter ↓↓')
    console.log(config)
    const { url, method, data, params, headers, baseURL, paramsSerializer } =
      config
    return new Promise((resolve, reject) => {
      uni.request({
        method: method.toUpperCase(),
        url: getFullURL(baseURL || '', url, params, paramsSerializer),
        header: headers,
        data,
        dataType: 'json',
        responseType: config.responseType,
        success: (res) => {
          console.log('request success ↓↓')
          console.log(res)
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
})

/**
 * 请求拦截
 */
instance.interceptors.request.use((config) => {
  const { method, params } = config
  // 附带鉴权的token
  const headers = {
    token: uni.getStorageSync('token')
  }
  // 不缓存get请求
  if (method === 'get') {
    headers['Cache-Control'] = 'no-cache'
  }
  // delete请求参数放入body中
  if (method === 'delete') {
    headers['Content-type'] = 'application/json;'
    Object.assign(config, {
      data: params,
      params: {}
    })
  }

  return {
    ...config,
    headers
  }
})

/**
 * 响应拦截
 */
instance.interceptors.response.use((v) => {
  if (v.data?.code === 401) {
    uni.removeStorageSync('token')
    // alert('即将跳转登录页。。。', '登录过期')
    // setTimeout(redirectHome, 1500)
    return v.data
  }

  if ((v.status || v.statusCode) === 200) {
    return v.data
  }
  // alert(v.statusText, '网络错误')
  return Promise.reject(v)
})

export default instance
