import request from "../request"

export const verifyUserLogin = () => {
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
