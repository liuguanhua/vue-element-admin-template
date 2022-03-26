<script lang="tsx">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { ElIcon, ElHeader } from 'element-plus'

import { Expand, Fold } from '@element-plus/icons-vue'

import { useConfig } from '@/components/hooks'
import { useGlobalStore } from '@/store/modules/global'

export default defineComponent({
  setup() {
    const { clsPrefix } = useConfig('layout-header')
    const globalState = useGlobalStore()
    const { collapse } = storeToRefs(globalState)
    const toggleCollapsed = () => {
      globalState.$patch((state) => {
        state.collapse = !collapse.value
      })
    }
    return () => {
      return (
        <ElHeader layout-align="space-between center" class={`${clsPrefix}`}>
          <span onClick={toggleCollapsed}>
            <ElIcon class="font-size-24 cursign">
              {collapse.value ? <Expand /> : <Fold />}
            </ElIcon>
          </span>
        </ElHeader>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-header');

.#{$prefix} {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0 10px #eee;
}
</style>
