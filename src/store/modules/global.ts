import { defineStore } from 'pinia'

import { replaceState } from '@/scripts'
import { useConfig } from '@/components/hooks'
import routes from '@/router/routes'

export const useGlobalStore = defineStore('global', {
  state: () => {
    const { menuSideBgColor, menuTextColor, menuActiveTextColor } = useConfig()
    return {
      collapse: false,
      menuSideBgColor,
      menuTextColor,
      menuActiveTextColor,
      routes,
    }
  },
  actions: {
    changState(state, payload) {
      return replaceState(state, payload)
    },
  },
})
