import { goLogin } from '@/scripts/apis/users'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      avatar: '/static/avatar.png',
      name: 'Super Admin',
      userInfo: {} as Dictionary
    }
  },
  actions: {
    async login(payload) {
      const response = await goLogin(payload)
      this.userInfo = response
      return response
    },
  },
})
