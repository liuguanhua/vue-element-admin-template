import { BasicLayout as Layout, MainView } from '@/layouts'

import { DEFAULT_ROUTE } from '@/scripts/constant'
import { TRouteRowArray } from '@/types'

/*
ref:https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/router-and-nav.html#%E9%85%8D%E7%BD%AE%E9%A1%B9

hidden: true
redirect: 'noRedirect'
alwaysShow: true
name: 'router-name'
meta: {
  title: 'title'
  noCache: true
  breadcrumb: false
  affix: true
  activeMenu: '/article/list'
  以上配置项功能跟vue-element-admin相同

  //
  icon: 'svg-name' //自定义svg icon，需放在/src/assets/icons文件夹中，或者自行更改vite配置
  elIcon:'HomeFilled' //取值 ref:https://element-plus.org/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88
}
*/

const routes: TRouteRowArray = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/pages/redirect/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        component: () => import('@/pages/dashboard/index.vue'),
        ...DEFAULT_ROUTE,
      },
    ],
  },
  {
    path: '/user',
    component: MainView,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/login/index.vue'),
        hidden: true,
        meta: { title: '登录', },
      },
    ],
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/list1',
    name: 'Table',
    alwaysShow: true,
    meta: { title: '表格', elIcon: 'Grid', },
    children: [
      ...[...Array(21).keys()].slice(1).map((item) => ({
        path: `list${item}`,
        component: () => import('@/pages/table/index.vue'),
        name: `TableList${item}`,
        meta: { title: `基础表格${item}`, },
      }))
    ],
  },
  {
    //ref:https://router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
    // path: '/:w+',
    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: () => import('@/pages/notFound/index.vue'),
    hidden: true,
  },
]
export default routes
