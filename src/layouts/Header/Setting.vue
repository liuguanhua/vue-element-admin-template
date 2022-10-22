<script lang="tsx">
import { defineComponent, watch } from 'vue'
import { ElDrawer, ElSwitch } from 'element-plus'
import { storeToRefs } from 'pinia'

import {
  ElSvgIcon,
  BegetDrawer,
  BegetThemeContainer,
  TElDrawerProps,
} from '@/components/common'

import { useTheme, themeSkin } from '@/components/hooks'
import { setStorage, WEB_CONFIG } from '@/scripts'
import { useGlobalStore } from '@/store/modules/global'

const themeKeys = Object.keys(themeSkin)

export default defineComponent<TElDrawerProps>({
  props: ElDrawer.props,
  setup(props) {
    const globalStore = useGlobalStore()
    const { isFixedHeader, isFixedSidebar, isOpenFastNav } =
      storeToRefs(globalStore)
    const { theme, switchTheme } = useTheme()
    const swapTheme = (status: string) => {
      switchTheme(status)
      setStorage(WEB_CONFIG, {
        theme: status,
      })
    }

    watch(
      () => ({
        isFixedHeader: isFixedHeader.value,
        isFixedSidebar: isFixedSidebar.value,
        isOpenFastNav: isOpenFastNav.value,
      }),
      (info) => {
        setStorage(WEB_CONFIG, info)
      }
    )

    return () => {
      return (
        <BegetDrawer
          v-slots={{
            header: () => {
              return (
                <BegetThemeContainer tag="span" showThemeColor>
                  设置
                </BegetThemeContainer>
              )
            },
          }}
          {...(props as any)}
        >
          <BegetThemeContainer tag showThemeColor>
            <h3>主题色</h3>
            <ul class="theme_list" layout-align="space-between center">
              {themeKeys.map((item) => {
                const color = themeSkin[item]
                const isActive = Object.is(theme.value, item)
                return (
                  <li
                    style={{
                      backgroundColor: color,
                    }}
                    onClick={() => {
                      swapTheme(item)
                    }}
                    class={{
                      active: isActive,
                    }}
                    key={item}
                  >
                    <ElSvgIcon class="theme-check" name="Check" />
                  </li>
                )
              })}
            </ul>
            <h3>页面设置</h3>
            <ul>
              <li layout-align="space-between center">
                固定头部
                <ElSwitch v-model={isFixedHeader.value} />
              </li>
              <li layout-align="space-between center">
                固定侧边菜单
                <ElSwitch v-model={isFixedSidebar.value} />
              </li>
              <li layout-align="space-between center">
                开启快捷导航
                <ElSwitch v-model={isOpenFastNav.value} />
              </li>
            </ul>
          </BegetThemeContainer>
        </BegetDrawer>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
.theme_list {
  li {
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    i {
      display: none;
    }
  }
  .active {
    border: 2px solid var(--color-primary-0);
    i {
      display: block;
    }
  }
  .theme-check {
    position: absolute;
    top: 6px;
    right: 0;
    left: 0;
    margin: auto;
    color: var(--color-primary-0);
    font-weight: 900;
  }
}
</style>
