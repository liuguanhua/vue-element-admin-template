import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import routes from './routes'
import { useUserStore } from '@/store/modules/user'
import { LOGIN_PATH } from '@/scripts'

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
  const userStore = useUserStore()
  const { userInfo } = userStore
  if (to.path == LOGIN_PATH) {
    userInfo.userId ? next('/') : next()
  } else {
    if (userInfo.userId) {
      return next()
    }
    if (from.path === LOGIN_PATH) {
      NProgress.done(true);
      next(false);
    } else {
      next(LOGIN_PATH)
    }
  }
})

router.afterEach(() => {
  NProgress.done();
});

export default function setupRouter(app: App<Element>) {
  app.use(router)
}
