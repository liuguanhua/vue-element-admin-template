import { defineStore } from 'pinia'

import { replaceState } from '@/scripts'
import { TRouteRowArray } from '@/types'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      collapse: false,
      isFixedSidebar: true,
      isFixedHeader: true,
      routes: [] as TRouteRowArray,
      cacheViews: [] as string[],
    }
  },
  actions: {
    updateState(payload) {},
  },
})
