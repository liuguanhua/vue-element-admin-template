<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { ElScrollbar } from 'element-plus'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import MenuItem from './MenuItem.vue'
import { BegetElMenu } from '@/components/common'

import { useGlobalStore } from '@/store/modules/global'
import { useConfig } from '@/components/hooks'

export default defineComponent({
  setup() {
    const route = useRoute()
    const globalState = useGlobalStore()
    const { clsPrefix, sideLogoHeight } = useConfig('layout-aside')
    const { routes, collapse } = storeToRefs(globalState)

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })

    return () => {
      return (
        <ElScrollbar
          style={{
            height: `calc(100% - ${sideLogoHeight})`,
          }}
          class={`${clsPrefix}-menu`}
        >
          <BegetElMenu
            defaultActive={activeMenu.value}
            collapse={collapse.value}
            collapseTransition={false}
          >
            {routes.value.map((route) => (
              <MenuItem key={route.path} level={1} route={route} />
            ))}
          </BegetElMenu>
        </ElScrollbar>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-aside');

.#{$prefix} {
  &-menu :deep() {
    .el-menu {
      border-right: none;
      > a .no-icon-title {
        margin-left: 28px;
      }
    }
    .el-menu-item.is-active {
      background-color: var(--color-primary-0);
    }
    a {
      display: block;
      &:hover {
        .el-menu-item {
          background-color: var(--color-primary-1);
          color: var(--color-white);
        }
      }
    }
    .is-active > .el-sub-menu__title,
    .el-sub-menu__title:hover {
      .sider-menu-title,
      .el-sub-menu__icon-arrow {
        // color: var(--color-white);
      }
    }
    .el-sub-menu {
      .el-menu-item,
      .sider-menu-title {
        > .no-icon-title {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
