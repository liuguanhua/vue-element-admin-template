<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    return () => {
      const route = useRoute()
      return (
        <RouterView key={route.path}>
          {{
            default: ({ Component }) => {
              return <Component />
            },
          }}
        </RouterView>
      )
    }
  },
})
</script>
