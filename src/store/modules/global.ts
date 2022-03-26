import { defineStore } from 'pinia'

import { replaceState } from '@/scripts'
import { TRouteRowArray } from '@/types'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      collapse: false,
      isFixedSidebar: true,
      routes: [] as TRouteRowArray,
    }
  },
  actions: {
    updateState(state, payload) {
      return replaceState(state, payload)
    },
  },
})
