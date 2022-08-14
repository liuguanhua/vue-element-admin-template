<script lang="tsx">
import { ElTabs } from 'element-plus'
import { defineComponent, reactive } from 'vue'

import { BegetElTabs } from '@/components/common'

const { TabPane } = ElTabs

export default defineComponent({
  setup() {
    const state = reactive({
      activeKey: '0',
    })
    return () => {
      return (
        <BegetElTabs class="tac" v-model={state.activeKey}>
          <TabPane key="0" label="消息">
            消息内容
          </TabPane>
          <TabPane key="1" label="代办">
            代办内容
          </TabPane>
        </BegetElTabs>
      )
    }
  },
})
</script>
