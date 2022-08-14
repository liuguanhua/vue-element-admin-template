<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => {
      return (
        <div style="height:80%;">
          <RouterLink to="/">home</RouterLink>
          <br />
        </div>
      )
    }
  },
})
</script>
