import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      avatar: '/static/avatar.png',
      name: 'Super Admin',
    }
  },
  actions: {},
})
