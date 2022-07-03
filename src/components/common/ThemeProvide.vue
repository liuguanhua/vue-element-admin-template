<script lang="tsx">
import { defineComponent, Fragment, provide, reactive, toRefs } from 'vue'

import {
  THEME_CONFIG_KEY,
  DEFAULT_THEME,
  getWebConfigStore,
  THEME_FIELDS,
} from '@/scripts'

export default defineComponent({
  setup(_, { slots }) {
    const { theme } = getWebConfigStore()
    const state = reactive<{
      theme: TThemeField
    }>({
      theme: THEME_FIELDS.includes(theme) ? theme : DEFAULT_THEME,
    })
    const switchTheme = (theme) => {
      state.theme = theme
    }
    provide(THEME_CONFIG_KEY, { ...toRefs(state), switchTheme })
    return () => {
      const children = (slots.default && slots.default()) || null
      return <Fragment>{children}</Fragment>
    }
  },
})
</script>
