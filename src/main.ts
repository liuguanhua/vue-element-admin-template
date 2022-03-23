import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'

import App from './App.vue'
import setupRouter from './router'
import { setupStore } from './store'

const bootstrap = () => {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  app.use(ElementPlus)
  app.mount('#app')
}

bootstrap()
