<script lang="tsx">
import path from 'path'
import { pathToRegexp, parse } from 'path-to-regexp'
import {
  defineComponent,
  watch,
  reactive,
  onMounted,
  ref,
  nextTick,
  unref,
} from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ElScrollbar, ElTabPane, ElTabs, TabsPaneContext } from 'element-plus'

import TabsContextMenu from './TabsContextMenu.vue'

import { useConfig } from '@/components/hooks'
import { TRouteRowArray } from '@/types'
import { useGlobalStore } from '@/store/modules/global'
import {
  DEFAULT_ROUTE,
  getStorage,
  isUndefined,
  setStorage,
  HISTORY_ROUTE_KEY,
  isVaildArray,
} from '@/scripts'
import { ElSvgIcon } from '@/components/common'
import { EContextMenuOperates } from '@/types/enum.d'

const flatRoutesData = (routes: TRouteRowArray, basePath = '/') => {
  let affixRoutes: Dictionary[] = []
  let allRoutes: Dictionary[] = []
  routes.forEach((route) => {
    const newPath =
      DEFAULT_ROUTE.path == route.path ? '/' + route.path : route.path
    const routePath = (basePath == '/' ? '' : basePath + '/') + newPath //path.resolve(basePath, route.path)
    if (route.meta) {
      const info = {
        fullPath: routePath,
        path: routePath,
        name: route.name,
        meta: { ...route.meta },
      }
      route.meta.affix && affixRoutes.push(info)
      allRoutes.push(info)
    }
    if (route.children) {
      const { affixRoutes: tempAffixRoutes, allRoutes: tempAllRoutes } =
        flatRoutesData(route.children, routePath)
      if (tempAffixRoutes.length >= 1) {
        affixRoutes = [...affixRoutes, ...tempAffixRoutes]
      }
      if (tempAllRoutes.length >= 1) {
        allRoutes = [...allRoutes, ...tempAllRoutes]
      }
    }
  })
  return {
    affixRoutes,
    allRoutes,
  }
}

const matchStoreRoutes = (data, allRoutes) => {
  const list = data.reduce((result, item) => {
    const { name, meta, path: routePath } = item
    if (name && meta?.title) {
      const itemRoute = allRoutes.find((cur) => {
        return cur.path == routePath || pathToRegexp(cur.path).exec(routePath)
      })
      const paths = result.map((cur) => cur.path)
      if (itemRoute && !paths.includes(itemRoute.path)) {
        //更新路由信息
        result.push({
          ...item,
          ...itemRoute,
          path: item.path,
        })
      }
    }
    return result
  }, [])
  const beforePaths = list
    .filter((item) => item.meta?.affix)
    .map((item) => item.path)
  const filterAffixRoutes = allRoutes.filter((item) => {
    return item.meta?.affix && !beforePaths.includes(item.path)
  })
  console.log(list, filterAffixRoutes)
  return [...filterAffixRoutes, ...list]
}

function triggerResize() {
  if (typeof Event === 'function') {
    window.dispatchEvent(new Event('resize'))
  } else {
    var evt = window.document.createEvent('UIEvents')
    evt.initUIEvent('resize', true, false, window, 0)
    window.dispatchEvent(evt)
  }
}

function goScrollTo(el: HTMLDivElement) {
  return (to: number) => {
    el.scrollTo({ left: to, behavior: 'smooth' })
  }
}

export default defineComponent({
  setup() {
    const { clsPrefix } = useConfig('layout-history-view')
    const route = useRoute()
    const router = useRouter()
    const globalState = useGlobalStore()
    const { routes } = storeToRefs(globalState)
    const refScrollbar = ref<Dictionary>({})
    const refTabsContextMenu = ref<Dictionary>({})
    const state = reactive<{
      historyData: Dictionary[]
      activeKey: string
      visible: boolean
      left: number
      top: number
      curHistory: Dictionary
    }>({
      historyData: [],
      activeKey: '',
      visible: false,
      left: 0,
      top: 0,
      curHistory: {},
    })

    const moveToTarget = async () => {
      await nextTick()
      const currentIndex = state.historyData.findIndex(
        (item) => item.path == state.activeKey
      )
      if (currentIndex < 0) {
        return
      }
      const $scrollbar = refScrollbar.value.$el
      const containerWidth = $scrollbar.offsetWidth
      const $wrap = $scrollbar.querySelector('.el-scrollbar__wrap')
      const scrollTo = goScrollTo($wrap)
      if (currentIndex == 0) {
        scrollTo(0)
      } else if (currentIndex == state.historyData.length - 1) {
        scrollTo($wrap.scrollWidth - containerWidth)
      } else {
        const elTabsPane = $wrap.querySelectorAll('.el-tabs__item')
        const prevTabPane = elTabsPane[currentIndex - 1]
        const nextTabPane = elTabsPane[currentIndex + 1]
        const afterNextTabOffsetLeft =
          nextTabPane.offsetLeft + nextTabPane.offsetWidth + 2
        const beforePrevTabffsetLeft = prevTabPane.offsetLeft
        if (afterNextTabOffsetLeft > $wrap.scrollLeft + containerWidth) {
          scrollTo(afterNextTabOffsetLeft - containerWidth)
        } else if (beforePrevTabffsetLeft < $wrap.scrollLeft) {
          scrollTo(beforePrevTabffsetLeft)
        }
      }
    }

    const addRoute = () => {
      state.activeKey = route.path as string
      setStorage(HISTORY_ROUTE_KEY, {
        activeKey: state.activeKey,
      })
      if (
        !route.meta?.title ||
        state.historyData.some((item) => item.path == route.path)
      ) {
        return
      }
      state.historyData = [...state.historyData, ...[{ ...route }]] // 防止相互影响
    }

    const onTabClick = (pane: TabsPaneContext) => {
      const { index, paneName } = pane
      if (paneName == route.path || isUndefined(index)) {
        return
      }
      const { path, query } = state.historyData[index]
      router.push({
        path,
        query,
      })
    }

    const toLastRoute = () => {
      let activeRoute = state.historyData.slice(-1)[0]
      if (!activeRoute) {
        activeRoute = { ...DEFAULT_ROUTE, path: `/${DEFAULT_ROUTE.path}` }
      }
      state.activeKey = activeRoute.path
      router.push({
        path: activeRoute.path,
        query: activeRoute.query,
      })
    }

    const onTabRemove = (paneName: string | number) => {
      state.historyData = state.historyData.filter(
        (item) => item.path !== paneName
      )
      if (paneName !== route.path) {
        return
      }
      toLastRoute()
    }

    const initHistoryRoute = () => {
      const storeHistoryRoute = getStorage(HISTORY_ROUTE_KEY)
      const { allRoutes, affixRoutes } = flatRoutesData(routes.value)
      if (!storeHistoryRoute || !isVaildArray(storeHistoryRoute.historyData)) {
        state.historyData = affixRoutes
        addRoute()
      } else {
        state.historyData = matchStoreRoutes(
          storeHistoryRoute.historyData,
          allRoutes
        )
        console.log(2)
        state.activeKey = state.historyData.some(
          (item) => item.path == storeHistoryRoute.activeKey
        )
          ? storeHistoryRoute.activeKey
          : `/${DEFAULT_ROUTE.path}`
      }
    }

    const openMenu = (routeItem: Dictionary) => {
      return (e: MouseEvent) => {
        e.preventDefault()
        const target = refScrollbar.value.$el
        const menuMinWidth = 100
        const offsetLeft = target.getBoundingClientRect().left
        const offsetWidth = target.offsetWidth
        const maxLeft = offsetWidth - menuMinWidth
        const left = e.clientX - offsetLeft + 15
        state.left = left > maxLeft ? maxLeft : left
        state.top = e.clientY
        state.visible = true
        state.curHistory = routeItem
        console.log(
          '🚀 ~ file: index.vue ~ line 249 ~ return ~ routeItem',
          routeItem
        )
      }
    }

    const closeMenu = () => {
      state.visible = false
    }

    const onSelect = (index: string) => {
      switch (index) {
        case EContextMenuOperates.refresh:
          router.replace({
            path: '/redirect' + state.curHistory.fullPath,
          })
          break
        case EContextMenuOperates.close:
          onTabRemove(state.curHistory.path)
          break
        case EContextMenuOperates.other:
          router.push(state.curHistory)
          state.historyData = state.historyData.filter((item) => {
            return item.meta.affix || item.path == state.curHistory.path
          })
          break
        case EContextMenuOperates.all:
          state.historyData = state.historyData.filter((item) => {
            return item.meta.affix
          })
          if (
            state.historyData.some((item) => item.path == state.curHistory.path)
          ) {
            return
          }
          toLastRoute()
        default:
          break
      }
    }

    onMounted(() => {
      initHistoryRoute()
      moveToTarget()
    })

    watch(
      () => state.historyData,
      async () => {
        setStorage(HISTORY_ROUTE_KEY, {
          historyData: state.historyData.map(({ matched, ...rest }) => rest),
        })
        const cacheViews = state.historyData.reduce((result, item) => {
          if (!item.noCache && item.name && !result.includes(item.name)) {
            result.push(item.name)
          }
          return result
        }, []) as string[]
        globalState.$patch({
          cacheViews,
        })
        await nextTick()
        triggerResize() //防止滚动条不自动显示隐藏
      }
    )

    watch(
      () => route.path,
      () => {
        addRoute()
        moveToTarget()
      }
    )

    watch(
      () => state.visible,
      (value) => {
        if (value) {
          document.body.addEventListener('click', closeMenu)
        } else {
          document.body.removeEventListener('click', closeMenu)
        }
      }
    )

    return () => {
      return (
        <>
          <ElScrollbar ref={refScrollbar} class={clsPrefix}>
            <ElTabs
              v-model={state.activeKey}
              type="card"
              // onTab-remove={onTabRemove}
              onTab-click={onTabClick}
              stretch={false}
            >
              {state.historyData.map((item) => {
                const { meta, path } = item
                return (
                  <ElTabPane
                    v-slots={{
                      label: () => {
                        return (
                          <span
                            onContextmenu={openMenu(item)}
                            class="inline-block vat h-100"
                          >
                            <span>{meta.title}</span>
                            <ElSvgIcon
                              name="Close"
                              class={[
                                'is-icon-close',
                                {
                                  'is-closable': !meta.affix,
                                },
                              ]}
                              {...{
                                onClick: (e: MouseEvent) => {
                                  e.stopPropagation()
                                  onTabRemove(path)
                                },
                              }}
                            ></ElSvgIcon>
                          </span>
                        )
                      },
                    }}
                    name={path}
                    key={path}
                    closable={!meta.affix}
                  ></ElTabPane>
                )
              })}
            </ElTabs>
          </ElScrollbar>
          <TabsContextMenu
            onSelect={onSelect}
            v-show={state.visible}
            style={{
              left: `${state.left}px`,
              top: `${state.top}px`,
            }}
            ref={refTabsContextMenu}
          />
        </>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-history-view');

.#{$prefix} {
  :deep() {
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      display: none;
    }
    .el-scrollbar__wrap {
      padding-bottom: 10px;
    }
    .el-tabs__nav-wrap,
    .el-tabs__nav-scroll,
    .el-tabs__content {
      overflow: initial;
    }
    .el-tabs__nav-wrap {
      padding: 0 0 40px;
    }
    .el-tabs__header,
    .el-tabs__nav-wrap {
      margin-bottom: 0;
    }
    .el-tabs--card > .el-tabs__header {
      .el-tabs__nav {
        transform: none !important;
      }
      .el-tabs__item {
        border-bottom: 1px solid var(--el-border-color-light);
        background-color: var(--color-light-gray);
        padding: 0;
        > span {
          padding: 0 20px;
          + .is-icon-close {
            display: none;
          }
        }
      }
      .el-tabs__item.is-active {
        border-bottom-color: var(--color-light-gray);
      }
      .is-icon-close svg {
        margin-top: 0;
      }
    }
    .el-tabs__item.is-active {
      color: var(--color-primary-0);
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      border-bottom-color: var(--color-light-gray);
    }
  }
}
</style>
