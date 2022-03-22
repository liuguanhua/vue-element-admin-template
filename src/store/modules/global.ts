import { defineStore } from 'pinia'

import { replaceState } from '@/scripts'
import { useConfig } from '@/components/hooks'
import routes from '@/router/routes'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      collapse: true,
      isFixedSidebar: true,
      routes,
    }
  },
  actions: {
    changState(state, payload) {
      return replaceState(state, payload)
    },
  },
})
