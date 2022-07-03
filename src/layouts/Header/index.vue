<script lang="tsx">
import { defineComponent, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import {
  ElHeader,
  ElDropdownMenu,
  ElDropdownItem,
  ElBadge,
  ElPopover,
} from 'element-plus'

import Breadcrumb from './Breadcrumb.vue'
import Setting from './Setting.vue'
import {
  ElSvgIcon,
  SvgIcon,
  BegetThemeContainer,
  BegetElDropdown,
  BegetElPopover,
} from '@/components/common'
import Notice from './Notice.vue'

import { useConfig } from '@/components/hooks'
import { useGlobalStore } from '@/store/modules/global'
import { useUserStore } from '@/store/modules/user'
import { setWebConfigStore } from '@/scripts'

export default defineComponent({
  setup() {
    const state = reactive({
      visible: false,
    })
    const { clsPrefix, title, link } = useConfig('layout-header')
    const globalState = useGlobalStore()
    const userState = useUserStore()
    const { collapse } = storeToRefs(globalState)
    const { name, avatar } = storeToRefs(userState)

    const toggleCollapsed = () => {
      globalState.$patch((state) => {
        state.collapse = !collapse.value
        setWebConfigStore({
          collapse: state.collapse,
        })
      })
    }

    const onSettings = () => {
      state.visible = true
    }

    return () => {
      return (
        <>
          <BegetThemeContainer showThemeBgColor>
            <ElHeader
              layout-align="space-between center"
              class={`${clsPrefix}`}
            >
              <div layout-align="start center">
                <span class="m-r-10" onClick={toggleCollapsed}>
                  <ElSvgIcon
                    name={collapse.value ? 'Expand' : 'Fold'}
                    class="color-dark-0 hover-color-primary-0 font-size-24 cursign vam"
                  ></ElSvgIcon>
                </span>
                <Breadcrumb />
              </div>
              <div layout-align="start center">
                <a
                  title={title}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={link}
                >
                  <SvgIcon
                    class="color-dark-0 hover-color-primary-0 font-size-22 vam"
                    name="github"
                  />
                </a>
                <ElSvgIcon
                  onClick={onSettings}
                  name="Setting"
                  class="color-dark-0 hover-color-primary-0 font-size-22 vam m-l-14 m-r-14 cursign"
                ></ElSvgIcon>
                <BegetElPopover
                  popperOptions={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 24],
                        },
                      },
                    ],
                  }}
                  v-slots={{
                    reference() {
                      return (
                        <ElBadge class="cursign" isDot>
                          <ElSvgIcon
                            name="BellFilled"
                            class="color-dark-0 hover-color-primary-0 font-size-22 vam"
                          ></ElSvgIcon>
                        </ElBadge>
                      )
                    },
                  }}
                >
                  <Notice />
                </BegetElPopover>
                <BegetElDropdown
                  popperOptions={{
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 17],
                        },
                      },
                    ],
                  }}
                  v-slots={{
                    dropdown: () => {
                      return (
                        <ElDropdownMenu>
                          <ElDropdownItem>你好 - {name.value}</ElDropdownItem>
                          <ElDropdownItem>退出登录</ElDropdownItem>
                        </ElDropdownMenu>
                      )
                    },
                  }}
                >
                  <span class="cursign">
                    <BegetThemeContainer showThemeColor>
                      <span>
                        <ElSvgIcon
                          name="UserFilled"
                          class="color-dark-0 hover-color-primary-0 font-size-22 vam m-l-14 vam"
                        ></ElSvgIcon>
                        <span class="ellipsis inline-block vam m-l-14">
                          {name.value}
                        </span>
                        <img
                          class="avatar bdr-half vam m-l-14"
                          src={avatar.value}
                          alt={name.value}
                        />
                      </span>
                    </BegetThemeContainer>
                  </span>
                </BegetElDropdown>
              </div>
            </ElHeader>
          </BegetThemeContainer>
          <Setting
            modelValue={state.visible}
            size={256}
            onClose={() => {
              state.visible = false
            }}
          />
        </>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-header');

.#{$prefix} {
  height: 60px;
  box-shadow: 0 0 10px #eee;
}

.avatar {
  width: 35px;
}
</style>
