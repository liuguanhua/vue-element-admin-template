<script lang="tsx">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'
import { compile } from 'path-to-regexp'
import { useRoute, useRouter } from 'vue-router'

import { TRouteRow, TRouteRowArray } from '@/types'
import { useConfig } from '@/components/hooks'

const defaultPageRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  meta: { title: '首页', elIcon: 'Edit', affix: true },
}

export default defineComponent({
  setup() {
    const breadcrumbList = ref<TRouteRowArray>([])
    const { clsPrefix } = useConfig('layout-header')
    const route = useRoute()
    const router = useRouter()

    const getBreadcrumb = () => {
      let matched: any = route.matched.filter(
        (item) => item.meta?.title && item.meta?.breadcrumb !== false
      )
      const [firstRoute] = matched
      //第一个路由是否为默认页
      if (firstRoute.name !== defaultPageRoute.name) {
        matched = [defaultPageRoute, ...matched]
      }
      breadcrumbList.value = matched
    }

    const pathCompile = (path: string) => {
      const { params } = route
      const toPath = compile(path)
      return toPath(params)
    }

    const goJump = (item: TRouteRow) => {
      return (e: MouseEvent) => {
        e.preventDefault()
        const { redirect, path } = item
        router.push((redirect as string) || pathCompile(path))
      }
    }

    onMounted(() => {
      getBreadcrumb()
    })

    watch(
      () => route.path,
      () => {
        getBreadcrumb()
      }
    )

    return () => {
      return (
        <ElBreadcrumb class={`${clsPrefix}-breadcrumb`} separator="/">
          {breadcrumbList.value.map((item, index) => {
            const { path, redirect, meta = {} } = item
            const isLast = index == breadcrumbList.value.length - 1
            return (
              <ElBreadcrumbItem key={path}>
                {redirect == 'noRedirect' || isLast ? (
                  <span class="color-default-gray">{meta.title}</span>
                ) : (
                  <a onClick={goJump(item)}>{meta.title}</a>
                )}
              </ElBreadcrumbItem>
            )
          })}
        </ElBreadcrumb>
      )
    }
  },
})
</script>
<style lang="scss">
$prefix: generateClsPrefix('layout-header');

.#{$prefix} {
  &-breadcrumb {
    .el-breadcrumb__inner a,
    .el-breadcrumb__inner.is-link {
      color: var(--color-dark-0);
      font-weight: normal;
      &:hover {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
