import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import routes from './routes'
import { useGlobalStore } from '@/store/modules/global'

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
  scrollBehavior(to, from, saveScrollPosition) {
    return { left: 0, top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  const globalStore = useGlobalStore()
  globalStore.$patch((state) => {
    state.routes = routes
  })
  next()
  NProgress.done()
})

export default function setupRouter(app: App<Element>) {
  app.use(router)
}
