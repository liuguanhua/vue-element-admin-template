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
        <div style="height:1000px">
          <RouterLink to="/">home</RouterLink>
          <br />
          <RouterLink to="/components/markdown">markdown</RouterLink>
          <br />
          <RouterLink to="/components1/tinymce3/2">tinymce2</RouterLink>
          <br />
          <RouterLink to="/components1/tinymce3/4">tinymce4</RouterLink>
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
