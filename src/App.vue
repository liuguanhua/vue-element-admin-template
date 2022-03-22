<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

export default defineComponent({
  setup() {
    return () => {
      return <RouterView></RouterView>
    }
  },
})
</script>

<style lang="scss">
@import '@/assets/styles/sass/global.scss';
</style>
