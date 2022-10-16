<script lang="tsx">
import { defineComponent, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import routes from '@/router/routes'
import { useGlobalStore } from './store/modules/global'

export default defineComponent({
  setup() {
    const globalStore = useGlobalStore()
    onMounted(() => {
      globalStore.$patch((state) => {
        state.routes = routes
      })
    })
    return () => {
      return <RouterView></RouterView>
    }
  },
})
</script>

<style lang="scss">
@import '@/assets/styles/sass/global.scss';
</style>
