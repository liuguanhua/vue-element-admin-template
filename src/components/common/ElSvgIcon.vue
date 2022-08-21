<script lang="tsx">
import { defineComponent, PropType } from 'vue'
import { ElIcon } from 'element-plus'
import * as ElSvg from '@element-plus/icons-vue'

export default defineComponent({
  extends: ElIcon,
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    onClick: Function as PropType<(e: MouseEvent) => void>,
  },
  setup(props, { attrs }) {
    return () => {
      const { name } = props
      return (
        <ElIcon {...attrs} {...props}>
          {ElSvg[name]?.render()}
        </ElIcon>
      )
    }
  },
})
</script>
