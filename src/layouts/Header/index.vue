<script lang="tsx">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import {
  ElIcon,
  ElHeader,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBadge,
} from 'element-plus'
import {
  Expand,
  Fold,
  Setting,
  UserFilled,
  BellFilled,
} from '@element-plus/icons-vue'

import Breadcrumb from './Breadcrumb.vue'
import { SvgIcon } from '@/components/common'

import { useConfig } from '@/components/hooks'
import { useGlobalStore } from '@/store/modules/global'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup() {
    const { clsPrefix, title, link } = useConfig('layout-header')
    const globalState = useGlobalStore()
    const userState = useUserStore()
    const { collapse } = storeToRefs(globalState)
    const { name, avatar } = storeToRefs(userState)

    const toggleCollapsed = () => {
      globalState.$patch((state) => {
        state.collapse = !collapse.value
      })
    }

    return () => {
      return (
        <ElHeader layout-align="space-between center" class={`${clsPrefix}`}>
          <div layout-align="start center">
            <span class="m-r-10" onClick={toggleCollapsed}>
              <ElIcon class="color-dark-0 hover-color-primary-0 font-size-24 cursign vam">
                {collapse.value ? <Expand /> : <Fold />}
              </ElIcon>
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
            <ElIcon class="color-dark-0 hover-color-primary-0 font-size-22 vam m-l-14 cursign">
              <Setting />
            </ElIcon>
            <ElBadge isDot>
              <ElIcon class="color-dark-0 hover-color-primary-0 font-size-22 vam m-l-14 cursign">
                <BellFilled />
              </ElIcon>
            </ElBadge>
            <ElDropdown
              class="cursign"
              v-slots={{
                dropdown: () => {
                  return (
                    <ElDropdownMenu>
                      <RouterLink to="/">
                        <ElDropdownItem>你好 - {name.value}</ElDropdownItem>
                      </RouterLink>
                      <RouterLink to="/">
                        <ElDropdownItem>退出登录</ElDropdownItem>
                      </RouterLink>
                    </ElDropdownMenu>
                  )
                },
              }}
            >
              <ElIcon class="color-dark-0 hover-color-primary-0 font-size-22 vam m-l-14 vam">
                <UserFilled />
              </ElIcon>
              <span class="ellipsis inline-block vam m-l-14">{name.value}</span>
              <img
                class="avatar bdr-half vam m-l-14"
                src={avatar.value}
                alt={name.value}
              />
            </ElDropdown>
          </div>
        </ElHeader>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-header');

.#{$prefix} {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 10px #eee;
}

.avatar {
  width: 35px;
}
</style>
