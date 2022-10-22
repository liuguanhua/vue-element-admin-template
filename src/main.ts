import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import setupRouter from './router'
import { setupStore } from './store'

const bootstrap = () => {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  app.use(ElementPlus, {
    locale: zhCn,
  })
  app.mount('#app')
}

bootstrap()
