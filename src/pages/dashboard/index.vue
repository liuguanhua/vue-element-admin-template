<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { SvgIcon, ElSvgIcon } from '@/components/common'

export default defineComponent({
  name: 'App',
  setup() {
    const count = ref(0)
    const handleClick = () => {
      count.value++
    }
    return () => {
      return (
        <div>
          {/*<SvgIcon name="we-chat" />
          <ElSvgIcon name="Edit" />
          <ElButton onClick={handleClick}>{count.value}</ElButton>
          <ElInput v-model={count.value} />*/}
        </div>
      )
    }
  },
})
</script>
