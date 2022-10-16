import { BasicLayout as Layout, MainView } from '@/layouts'

import { DEFAULT_ROUTE } from '@/scripts/constant'
import { TRouteRowArray } from '@/types'

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
    redirect: '/table/list',
    name: 'Table',
    alwaysShow: true,
    meta: { title: '表格', elIcon: 'Grid', },
    children: [
      ...[...Array(20).keys()].map((item) => ({
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
