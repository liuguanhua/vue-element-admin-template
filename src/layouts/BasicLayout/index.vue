<script lang="tsx">
import { defineComponent, KeepAlive, Transition, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ElContainer, ElFooter, ElMain } from 'element-plus'
import { storeToRefs } from 'pinia'

import Sidebar from '../Sidebar/index.vue'
import Header from '../Header/index.vue'
import HistoryRoute from '../HistoryRoute/index.vue'
import Setting from '../Header/Setting.vue'
import { BegetDrawer, ThemeProvide } from '@/components/common'

import { useGlobalStore } from '@/store/modules/global'
import { useConfig } from '@/components/hooks'

export default defineComponent({
  setup() {
    const { clsPrefix, menuSideFoldWidth, menuSideWidth } =
      useConfig('layout-header-view')
    const globalStore = useGlobalStore()
    const {
      cacheViews,
      isFixedHeader,
      isOpenFastNav,
      collapse,
      isMobile,
      isOpenSetting,
    } = storeToRefs(globalStore)
    const route = useRoute()
    const key = computed(() => route.fullPath)
    const onClose = () => {
      globalStore.$patch((state) => {
        state.collapse = true
      })
    }

    const onCloseSetting = () => {
      globalStore.$patch((state) => {
        state.isOpenSetting = false
      })
    }

    return () => {
      const width = collapse.value ? menuSideFoldWidth : menuSideWidth
      return (
        <ElContainer class="min-h-100">
          <ThemeProvide>
            {isMobile.value ? (
              <BegetDrawer
                customClass="reset-drawer-padding"
                withHeader={false}
                direction="ltr"
                modelValue={!collapse.value}
                onClose={onClose}
                size={menuSideWidth}
              >
                <Sidebar />
              </BegetDrawer>
            ) : (
              <Sidebar />
            )}
            <ElContainer>
              {isFixedHeader.value && (
                <div
                  style={{ height: `${isOpenFastNav.value ? 100 : 60}px` }}
                ></div>
              )}
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
                {isOpenFastNav.value && <HistoryRoute />}
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
            <Setting
              v-model={isOpenSetting.value}
              size={256}
              onClose={onCloseSetting}
            />
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
  transition: width 0.2s;
  &-fixed {
    position: fixed;
    z-index: 10;
    width: 100%;
  }
}
</style>
