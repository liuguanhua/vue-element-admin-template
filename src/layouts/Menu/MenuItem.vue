<script lang="tsx">
import path from 'path'
import { defineComponent, ref, reactive, PropType } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'

import Item from './Item.vue'
import MenuLink from './Link.vue'

import { TRouteRow, TRouteRowArray } from '@/scripts/types'
import { isExternal } from '@/scripts'

const resolvePath = (basePath: string) => {
  return (routePath: string) => {
    if (isExternal(routePath)) {
      return routePath
    }
    if (isExternal(basePath)) {
      return basePath
    }
    return path.resolve(basePath, routePath)
  }
}

const MenuItem = defineComponent({
  props: {
    route: {
      type: Object as PropType<TRouteRow>,
      default: {},
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return () => {
      const { route, basePath: fromBasePath } = props
      if (route.hidden) {
        return null
      }
      const basePath = fromBasePath || route.path
      const onlyOneChild = ref<Dictionary>({})
      const showRouteChild = (children: TRouteRowArray = []) =>
        children.filter((item) => {
          if (item.hidden) {
            return false
          } else {
            onlyOneChild.value = item
            return true
          }
        })

      const showOneRouteChild = (route: TRouteRow) => {
        const showRoutes = showRouteChild(route.children)
        if (showRoutes.length === 1) {
          return true
        }
        if (showRoutes.length === 0) {
          onlyOneChild.value = { ...route, path: '', noShowChild: true }
          return true
        }
        return false
      }
      const showOnlyOne =
        (showOneRouteChild(route) && !onlyOneChild.value.children) ||
        (onlyOneChild.value.noShowChild && !route.alwaysShow)
      const lastResolvePath = resolvePath(basePath)
      if (showOnlyOne) {
        const to = lastResolvePath(onlyOneChild.value.path)
        return (
          <MenuLink to={to}>
            <ElMenuItem index={to}>
              {onlyOneChild.value.meta && (
                <Item {...(onlyOneChild.value.meta || route.meta)} />
              )}
            </ElMenuItem>{' '}
          </MenuLink>
        )
      }
      return (
        <ElSubMenu
          v-slots={{
            title: () => <Item {...route.meta} />,
          }}
          index={lastResolvePath(route.path)}
          popper-append-to-body
          class="sub-menu-wrapper"
        >
          {route?.children?.map((item) => (
            <MenuItem
              key={item.path}
              route={item}
              basePath={lastResolvePath(item.path)}
            />
          ))}
        </ElSubMenu>
      )
    }
  },
})

export default MenuItem
</script>

<style lang="scss">
.sub-menu-wrapper {
  a {
    display: block;
    &:hover {
      color: var(--color-white);
      .el-menu-item {
        background-color: var(--color-primary);
      }
    }
  }
  &.is-active {
    .el-sub-menu__title {
      color: var(--color-white);
    }
  }
  .el-menu-item.is-active {
    background-color: var(--color-primary);
  }
  .el-menu {
    border-right: none;
  }
}
</style>
