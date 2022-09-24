<script lang="tsx">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    return () => {
      return (
        <div>
          {JSON.stringify({
            path: route.path,
            query: route.query,
          })}
        </div>
      )
    }
  },
})
</script>
