<script lang="tsx">
import { defineComponent, KeepAlive, Transition, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ElContainer, ElFooter, ElMain } from 'element-plus'
import { storeToRefs } from 'pinia'

import Sidebar from '../Sidebar/index.vue'
import Header from '../Header/index.vue'
import HistoryRoute from '../HistoryRoute/index.vue'
import { ThemeProvide } from '@/components/common'

import { useGlobalStore } from '@/store/modules/global'
import { useConfig } from '@/components/hooks'

export default defineComponent({
  setup() {
    const { clsPrefix, menuSideFoldWidth, menuSideWidth } =
      useConfig('layout-header-view')
    const globalStore = useGlobalStore()
    const { cacheViews, isFixedHeader, collapse, isMobile } =
      storeToRefs(globalStore)
    const route = useRoute()
    const key = computed(() => route.fullPath)

    return () => {
      const width = collapse.value ? menuSideFoldWidth : menuSideWidth
      return (
        <ElContainer class="min-h-100">
          <ThemeProvide>
            <Sidebar />
            <ElContainer>
              {isFixedHeader.value && <div style={{ height: '100px' }}></div>}
              <div
                class={[
                  clsPrefix,
                  { [`${clsPrefix}-fixed`]: isFixedHeader.value },
                ]}
                {...(isFixedHeader.value &&
                  !isMobile.value && {
                    style: {
                      width: `calc(100% - ${width})`,
                    },
                  })}
              >
                <Header />
                <HistoryRoute />
              </div>
              <ElMain>
                <RouterView>
                  {{
                    default: ({ Component }) => {
                      return (
                        <Transition appear name="fade-transform" mode="out-in">
                          <KeepAlive include={cacheViews.value}>
                            <Component key={key.value} />
                          </KeepAlive>
                        </Transition>
                      )
                    },
                  }}
                </RouterView>
              </ElMain>
              <ElFooter></ElFooter>
            </ElContainer>
          </ThemeProvide>
        </ElContainer>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-header-view');

.#{$prefix} {
  &-fixed {
    position: fixed;
    z-index: 1;
    width: 100%;
  }
}
</style>
