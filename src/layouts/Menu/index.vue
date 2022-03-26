<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import MenuItem from './MenuItem.vue'

import { useGlobalStore } from '@/store/modules/global'
import { useConfig } from '@/components/hooks'

export default defineComponent({
  setup() {
    const route = useRoute()
    const globalState = useGlobalStore()
    const {
      clsPrefix,
      sideLogoHeight,
      menuSideBgColor,
      menuTextColor,
      menuActiveTextColor,
    } = useConfig('layout-aside')
    const { routes, collapse } = storeToRefs(globalState)
    const filterRoutes = routes.value.filter((item) => !item.hidden)
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
          <ElMenu
            backgroundColor={menuSideBgColor}
            defaultActive={activeMenu.value}
            collapse={collapse.value}
            textColor={menuTextColor}
            activeTextColor={menuActiveTextColor}
            collapseTransition={false}
          >
            {filterRoutes.map((route) => (
              <MenuItem key={route.path} level={1} route={route} />
            ))}
          </ElMenu>
        </ElScrollbar>
      )
    }
  },
})
</script>
<style lang="scss">
$prefix: generateClsPrefix('layout-aside');

.#{$prefix} {
  &-menu {
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
        color: var(--color-white);
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
  &-popper {
    max-height: 100%;
    overflow: auto;
  }
}
</style>
