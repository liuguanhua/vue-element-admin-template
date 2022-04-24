<script lang="tsx">
import path from 'path'
import { defineComponent, watch, reactive, onMounted, toRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { ElTabPane, ElTabs, TabsPaneContext } from 'element-plus'

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

type TRouteRowAny = Omit<TRouteRow, 'meta'> & {
  meta?: any
}

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

export default defineComponent({
  setup(props, { slots }) {
    const { clsPrefix } = useConfig('layout-history-view')
    const route = useRoute()
    const router = useRouter()
    const globalState = useGlobalStore()
    const { routes, cacheViews } = storeToRefs(globalState)
    const state = reactive<{
      historyData: Dictionary[]
      activeKey: string
    }>({
      historyData: [],
      activeKey: '',
    })

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
      console.log({ ...route })
      state.historyData.push({ ...route }) // 防止相互影响
      setStorage(HISTORY_ROUTE_KEY, {
        historyData: state.historyData.map(({ matched, ...rest }) => rest),
      })
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

    watch(
      () => state.historyData,
      () => {
        console.log(Math.random())
      }
    )

    onMounted(() => {
      initHistoryRoute()
    })

    watch(
      () => route.path,
      () => {
        addRoute()
      }
    )

    return () => {
      return (
        <div class={clsPrefix}>
          <ElTabs
            v-model={state.activeKey}
            type="card"
            onTab-remove={onTabRemove}
            onTab-click={onTabClick}
          >
            {state.historyData.map((item) => {
              const { meta, path } = item
              return (
                <ElTabPane
                  label={meta.title}
                  name={path}
                  key={path}
                  closable={!meta.affix}
                ></ElTabPane>
              )
            })}
          </ElTabs>
        </div>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-history-view');

.#{$prefix} {
  background-attachment: fixed;
}
</style>
<style lang="scss">
$prefix: generateClsPrefix('layout-history-view');

.#{$prefix} {
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs__item.is-active {
    color: var(--color-primary-0);
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: var(--color-light-gray);
  }
}
</style>
