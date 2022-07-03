<script lang="tsx">
import { ElTabs } from 'element-plus'
import { defineComponent, reactive } from 'vue'

const { TabPane } = ElTabs

export default defineComponent({
  setup() {
    const state = reactive({
      activeKey: '0',
    })
    return () => {
      return (
        <ElTabs v-model={state.activeKey}>
          <TabPane key="0" label="消息">
            通知1
          </TabPane>
          <TabPane key="0" label="代办">
            消息
          </TabPane>
        </ElTabs>
      )
    }
  },
})
</script>
