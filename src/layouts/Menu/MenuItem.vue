<script lang="tsx">
import path from 'path'
import { defineComponent, ref, PropType } from 'vue'
import { ElSubMenu, ElMenuItem } from 'element-plus'
import { storeToRefs } from 'pinia'

import Item from './Item.vue'
import MenuLink from './Link.vue'

import { TRouteRow, TRouteRowArray } from '@/types'
import { isExternal } from '@/scripts'
import { useGlobalStore } from '@/store/modules/global'
import { useConfig } from '@/components/hooks'

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
    level: {
      type: Number,
    },
  },
  setup(props) {
    const { clsPrefix } = useConfig('layout-aside')
    const globalStore = useGlobalStore()
    const { collapse } = storeToRefs(globalStore)
    const { route, basePath: fromBasePath, level } = props
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
      showOneRouteChild(route) &&
      (!onlyOneChild.value.children || onlyOneChild.value.noShowChild) &&
      !route.alwaysShow
    const lastResolvePath = resolvePath(basePath)

    return () => {
      if (route.hidden) {
        return null
      }
      if (showOnlyOne) {
        if (!onlyOneChild.value.meta) {
          return null
        }
        const to = lastResolvePath(onlyOneChild.value.path)
        const itemProps = onlyOneChild.value.meta || route.meta
        const { elIcon, title, icon } = itemProps
        const isCollapseAndOneLevel = collapse.value && level == 1 //实现在collapse状态时菜单未能弹出名称
        return (
          <>
            {onlyOneChild.value.meta && (
              <MenuLink to={to}>
                <ElMenuItem
                  v-slots={{
                    title: () =>
                      isCollapseAndOneLevel && (
                        <span
                          class={[{ 'no-icon-title': !icon && !elIcon }, 'vam']}
                        >
                          {title}
                        </span>
                      ),
                  }}
                  index={to}
                >
                  <Item
                    {...itemProps}
                    title={isCollapseAndOneLevel ? '' : title}
                  />
                </ElMenuItem>
              </MenuLink>
            )}
          </>
        )
      }
      return (
        <ElSubMenu
          v-slots={{
            title: () => (
              <div class="sider-menu-title">
                <Item {...route.meta} />
              </div>
            ),
          }}
          index={lastResolvePath(route.path)}
          popperClass={`${clsPrefix}-menu ${clsPrefix}-popper`}
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
