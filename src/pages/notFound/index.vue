<script lang="tsx">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
import { ArrowLeftBold } from '@element-plus/icons-vue'

import ElSvgIconVue from '@/components/common/ElSvgIcon.vue'

export default defineComponent({
  setup() {
    const onBack = (e: MouseEvent) => {
      e.preventDefault()
      window.history.back()
    }
    return () => {
      return (
        <div class="not-found">
          <h1>⊙﹏⊙</h1>
          <p>404</p>
          <div>
            <a href="#" onClick={onBack}>
              <ElButton icon={ArrowLeftBold} type="primary">
                上一页
              </ElButton>
            </a>
            <a href="/">
              <ElButton class="m-l-16" type="primary">
                去首页
                <ElSvgIconVue class="m-l-10" name="HomeFilled" />
              </ElButton>
            </a>
          </div>
        </div>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
.not-found {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h1 {
    margin: 0;
    font-size: 30px;
  }
  p {
    font-size: 50px;
    margin: 0;
  }
}
</style>
