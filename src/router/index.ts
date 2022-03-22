import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
})

export default function setupRouter(app: App<Element>) {
  app.use(router)
}
