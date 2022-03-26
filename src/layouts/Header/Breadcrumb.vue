<script lang="tsx">
import { defineComponent } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

export default defineComponent({
  setup() {
    // const
    return () => {
      return (
        <ElBreadcrumb separator="/">
          <ElBreadcrumbItem></ElBreadcrumbItem>
        </ElBreadcrumb>
      )
    }
  },
})
</script>
