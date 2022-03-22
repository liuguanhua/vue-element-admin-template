<script lang="tsx">
import { defineComponent } from 'vue'
import { ElIcon } from 'element-plus'
import * as ElSvg from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
  },
  setup(props) {
    return () => {
      const { name } = props
      return (
        <ElIcon>
          {ElSvg[name] && ElSvg[name].render && ElSvg[name].render()}
        </ElIcon>
      )
    }
  },
})
</script>
