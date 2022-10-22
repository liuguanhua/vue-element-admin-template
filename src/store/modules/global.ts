import { defineStore } from 'pinia'

import { DEVICE_WIDTH, getWebConfigStore, isBoolean } from '@/scripts'
import { TRouteRowArray } from '@/types'

function takeConfigField(key: string, defaultValue: boolean = true) {
  const webConfig = getWebConfigStore()
  return isBoolean(webConfig[key]) ? webConfig[key] : defaultValue
}

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      collapse: takeConfigField('collapse', false),
      isFixedSidebar: takeConfigField('isFixedSidebar'),
      isFixedHeader: takeConfigField('isFixedHeader'),
      isOpenFastNav: takeConfigField('isOpenFastNav'),
      isOpenSetting: false,
      routes: [] as TRouteRowArray,
      cacheViews: [] as string[],
      isMobile: window.innerWidth <= DEVICE_WIDTH,
    }
  },
  actions: {
    updateState(payload) { },
  },
})
