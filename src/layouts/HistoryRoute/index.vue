<script lang="tsx">
import path from 'path'
import { defineComponent, watch, reactive, onMounted, ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import {
  ElIcon,
  ElScrollbar,
  ElTabPane,
  ElTabs,
  TabsPaneContext,
} from 'element-plus'
import { Close } from '@element-plus/icons-vue'

import TabsDropdown from './TabsDropdown.vue'

import { useConfig } from '@/components/hooks'
import { TRouteRow, TRouteRowArray } from '@/types'
import { useGlobalStore } from '@/store/modules/global'
import {
  DEFAULT_ROUTE,
  getStorage,
  isUndefined,
  setStorage,
  HISTORY_ROUTE_KEY,
  isVaildArray,
} from '@/scripts'

const filterAffixHistory = (routes: TRouteRowArray, basePath = '/') => {
  let data: Dictionary[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const routePath = path.resolve(basePath, route.path)
      data.push({
        fullPath: routePath,
        path: routePath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempHistory = filterAffixHistory(route.children, route.path)
      if (tempHistory.length >= 1) {
        data = [...data, ...tempHistory]
      }
    }
  })
  return data
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
    const refTabsDropdown = ref<Dictionary>({})
    const state = reactive<{
      historyData: Dictionary[]
      activeKey: string
      visible: boolean
      left: number
      top: number
    }>({
      historyData: [],
      activeKey: '',
      visible: false,
      left: 0,
      top: 0,
    })

    const moveToTarget = async () => {
      await nextTick()
      const currentIndex = state.historyData.findIndex(
        (item) => item.path == state.activeKey
      )
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

    const onTabRemove = (paneName: string | number) => {
      state.historyData = state.historyData.filter(
        (item) => item.path !== paneName
      )
      if (paneName !== route.path) {
        return
      }
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

    const initHistoryRoute = () => {
      const storeHistoryRoute = getStorage(HISTORY_ROUTE_KEY)
      if (!storeHistoryRoute || !isVaildArray(storeHistoryRoute.historyData)) {
        state.historyData = filterAffixHistory(routes.value)
        addRoute()
      } else {
        state.historyData = storeHistoryRoute.historyData.filter(
          (item) => item.name && item.meta?.title
        )
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
        console.log(e.clientX, offsetLeft)
        state.left = left > maxLeft ? maxLeft : left
        state.top = e.clientY
        refTabsDropdown.value.toggle()
        // this.selectedTag = tag
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
        const cacheViews = state.historyData
          .filter((item) => !item.noCache && item.name)
          .map((item) => item.name)
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
                            <ElIcon
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
                            >
                              <Close />
                            </ElIcon>
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
          <div
            style={{
              left: `${state.left}px`,
              top: `${state.top}px`,
            }}
            // v-show={state.visible}
            class="contextmenu"
          >
            <TabsDropdown ref={refTabsDropdown} />
          </div>
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

.contextmenu {
  margin: 0;
  z-index: 2;
  position: absolute;
  padding: 5px 0;
  border-radius: 5px;
  color: #333;
  width: 100px;
  height: 100px;
}
</style>
