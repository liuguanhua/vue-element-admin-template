<script lang="tsx">
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    onBeforeMount(() => {
      const { params, query } = route
      console.log(
        '🚀 ~ file: index.vue ~ line 12 ~ onBeforeMount ~ route',
        route.path,
        route.fullPath,
        params
      )
      const { path } = params
      console.log('🚀 ~ file: index.vue ~ line 13 ~ onBeforeMount ~ path', path)
      router.replace({ path: '/' + path, query })
    })

    return () => {
      return <div></div>
    }
  },
})
</script>
