<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { SvgIcon, ElSvgIcon } from '@/components/common'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0)
    const handleClick = () => {
      count.value++
    }
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
