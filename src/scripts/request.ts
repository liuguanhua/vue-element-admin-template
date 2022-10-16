import axios from 'axios'
import { ElMessage } from 'element-plus'

import { clearLoginStore } from './utils'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.defaults.withCredentials = true

const captureException = (err, callback: (res) => void) => {
  // import.meta.env.DEV && console.error(err)
  err = (err || {}) as Dictionary
  const { response, request: req } = err
  if (response) {
    const { status } = response
    if (!response.data && err.message) {
      ElMessage({
        type: 'error',
        message: err.message
      })
    } else if (status >= 500) {
      ElMessage({
        type: 'error',
        message: '服务器出错⊙﹏⊙'
      })
    } else if (Object.is(status, 404)) {
      ElMessage({
        type: 'error',
        message: '请求地址不存在⊙﹏⊙'
      })
    } else if (Object.is(status, 401)) {
      return clearLoginStore()
    }
    return callback(response)
  }
  if (req) {
    const { readyState, status } = req
    if (Object.is(readyState, 4) && Object.is(status, 0)) {
      ElMessage({
        type: 'error',
        message: '请求超时⊙﹏⊙'
      })
    }
    return callback(req)
  }
  if (axios.isCancel(err)) {
    throw err.message
  }
}

const request = (url: string, opts?: IRequestType) => {
  const options: IRequestType = {
    method: 'get',
    customApi: false,
    data: {},
    params: {},
    commonTips: true,
    errTips: false,
    success: () => { },
    error: () => { },
    ...opts
  }
  const {
    method,
    data,
    params,
    customApi,
    commonTips,
    errTips,
    success,
    error
  } = options
  return new Promise<any>((resolve, reject) => {
    axios({
      cancelToken: source.token,
      url: customApi ? url : `${window.APP_CONFIG.apiRoot}api/${url}`,
      method,
      params,
      data
      // timeout: 5000
    })
      .then(response => {
        const { data: info } = response
        const serveInfo = info || {}
        const { code, msg, result = {}, success: resSuccess } = serveInfo
        if (Object.is(code, 200) && resSuccess) {
          success && success(result)
          return resolve(result)
        }
        if (code >= 400) {
          commonTips && msg && ElMessage({
            type: 'error',
            message: msg
          })
          if (Object.is(code, 401)) {
            error && error(serveInfo)
            reject(serveInfo)
            return clearLoginStore()
          }
        }
        errTips && msg && ElMessage({
          type: 'error',
          message: msg
        })
        error && error(serveInfo)
        reject(serveInfo)
        throw result
      })
      .catch(err => {
        captureException(err, res => {
          error && error(res)
          return reject(res)
        })
      })
  })
}

export default request
