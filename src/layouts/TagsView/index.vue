<script lang="tsx">
import path from 'path'
import { defineComponent, watch, reactive, onMounted } from 'vue'
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
  TAGS_VIEW_KEY,
  isVaildArray,
} from '@/scripts'

type TRouteRowAny = Omit<TRouteRow, 'meta'> & {
  meta?: any
}

const filterAffixTags = (routes: TRouteRowArray, basePath = '/') => {
  let tags: Dictionary[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

export default defineComponent({
  setup(props, { slots }) {
    const { clsPrefix } = useConfig('layout-tags-view')
    const route = useRoute()
    const router = useRouter()
    const globalState = useGlobalStore()
    const { routes } = storeToRefs(globalState)
    const state = reactive<{
      tagsData: Dictionary[]
      activeKey: string
    }>({
      tagsData: [],
      activeKey: '',
    })

    const addTags = () => {
      state.activeKey = route.path as string
      setStorage(TAGS_VIEW_KEY, {
        activeKey: state.activeKey,
      })
      if (
        !route.meta?.title ||
        !route.name ||
        state.tagsData.some((item) => item.path == route.path)
      ) {
        return
      }
      state.tagsData.push({ ...route })
      setStorage(TAGS_VIEW_KEY, {
        tagsData: state.tagsData,
      })
    }

    const onTabClick = (pane: TabsPaneContext) => {
      const { index, paneName } = pane
      if (paneName == route.path || isUndefined(index)) {
        return
      }
      const { path, query } = state.tagsData[index]
      router.push({
        path,
        query,
      })
    }

    const onTabRemove = (paneName: string | number) => {
      state.tagsData = state.tagsData.filter((item) => item.path !== paneName)
      if (paneName !== route.path) {
        return
      }
      let activeRoute = state.tagsData.slice(-1)[0]
      if (!activeRoute) {
        activeRoute = { ...DEFAULT_ROUTE, path: `/${DEFAULT_ROUTE.path}` }
      }
      state.activeKey = activeRoute.path
      router.push({
        path: activeRoute.path,
        query: activeRoute.query,
      })
    }

    const initTagsView = () => {
      const storeTagsView = getStorage(TAGS_VIEW_KEY)
      if (!storeTagsView || !isVaildArray(storeTagsView.tagsData)) {
        state.tagsData = filterAffixTags(routes.value)
        return addTags()
      }
      state.tagsData = storeTagsView.tagsData
      state.activeKey = state.tagsData.some(
        (item) => item.path == storeTagsView.activeKey
      )
        ? storeTagsView.activeKey
        : `/${DEFAULT_ROUTE.path}`
    }

    onMounted(() => {
      initTagsView()
    })

    watch(
      () => route.path,
      () => {
        addTags()
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
            {state.tagsData.map((item) => {
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
$prefix: generateClsPrefix('layout-tags-view');

.#{$prefix} {
  transition: width 0.2s;
  &-title > div {
    height: $sideLogoHeight;
  }
}
</style>
<style lang="scss">
$prefix: generateClsPrefix('layout-tags-view');

.#{$prefix} {
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: var(--color-light-gray);
  }
}
</style>
