import { BasicLayout as Layout, MainView } from '@/layouts'

import { DEFAULT_ROUTE } from '@/scripts/constant'
import { TRouteRow, TRouteRowArray } from '@/types'

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
      {
        path: '/table',
        component: MainView,
        redirect: '/table/list',
        name: 'Table',
        meta: {
          title: 'Table',
          elIcon: 'Grid',
        },
        children: [
          {
            path: 'list',
            component: () => import('@/pages/dashboard/index.vue'),
            name: 'TableList',
            meta: { title: 'Table' },
          },
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
    ],
  },
]
export default routes
