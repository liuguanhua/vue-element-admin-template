import { createApp } from 'vue'
import 'virtual:svg-icons-register'

import 'element-plus/dist/index.css'
import 'normalize.css/normalize.css'

import App from './App.vue'
import setupRouter from './router'
import { setupStore } from './store'

const bootstrap = () => {
  const app = createApp(App)
  setupStore(app)
  setupRouter(app)
  app.mount('#app')
}

bootstrap()
