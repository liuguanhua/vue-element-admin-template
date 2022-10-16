import { defineStore } from 'pinia'

import { goLogin, goLogout, verifyIsLogin } from '@/scripts/apis/users'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      avatar: '/static/avatar.png',
      userInfo: {} as Dictionary
    }
  },
  actions: {
    async login(payload) {
      const response = await goLogin(payload)
      this.userInfo = response
      return response
    },
    logout() {
      return goLogout()
    },
    async verifyIsLogin() {
      const response = await verifyIsLogin()
      this.userInfo = response
      return response
    },
  },
})
