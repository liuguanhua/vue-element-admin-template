import request from "../request"

export const verifyIsLogin = () => {
  return request('users/verifyIsLogin', {
    commonTips: false
  })
}

export const goLogin = (data: object) => {
  return request('users/login/account', {
    method: 'post',
    data,
    errTips: true
  })
}

export const goLogout = () => {
  return request('users/logout/account', {
    method: 'post',
  })
}
