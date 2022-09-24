import { defineStore } from 'pinia'

import { DEVICE_WIDTH, getWebConfigStore, isBoolean } from '@/scripts'
import routes from '@/router/routes'

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
      isOpenSetting: false,
      routes,
      cacheViews: [] as string[],
      isMobile: window.innerWidth <= DEVICE_WIDTH,
      // drawerMenuVisible: false,
    }
  },
  actions: {
    updateState(payload) { },
  },
})
