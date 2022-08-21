<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#333',
    },
    prefix: {
      type: String,
      default: 'icon',
    },
  },
  setup(props) {
    return () => {
      const { prefix, color, name } = props
      const symbolId = `#${prefix}-${name}`
      return (
        <i class="el-icon">
          <svg aria-hidden="true">
            <use href={symbolId} fill={color} />
          </svg>
        </i>
      )
    }
  },
})
</script>
