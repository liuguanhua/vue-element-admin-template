<script lang="tsx">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { ElIcon, ElHeader } from 'element-plus'
import { Expand, Fold } from '@element-plus/icons-vue'

import Breadcrumb from './Breadcrumb.vue'

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
          <div layout-align="start center">
            <span class="m-r-10" onClick={toggleCollapsed}>
              <ElIcon class="color-dark-0 hover-color-primary-0 font-size-24 cursign vam">
                {collapse.value ? <Expand /> : <Fold />}
              </ElIcon>
            </span>
            <Breadcrumb />
          </div>
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
