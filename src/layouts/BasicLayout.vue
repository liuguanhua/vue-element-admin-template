<script lang="tsx">
import { defineComponent, KeepAlive, Transition, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ElContainer, ElFooter, ElHeader, ElMain } from 'element-plus'

import Sidebar from './Sidebar/index.vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const key = computed(() => route.path)
    return () => {
      return (
        <ElContainer class="min-h-100">
          <Sidebar />
          <ElContainer>
            <ElHeader>Header</ElHeader>
            <ElMain>
              <RouterView key={key.value}>
                {{
                  default: ({ Component }) => {
                    return (
                      <Transition name="fade-transform" mode="out-in">
                        <KeepAlive>
                          <Component />
                        </KeepAlive>
                      </Transition>
                    )
                  },
                }}
              </RouterView>
            </ElMain>
            <ElFooter>Footer</ElFooter>
          </ElContainer>
        </ElContainer>
      )
    }
  },
  render() {},
})
</script>
<style scoped>
.common-layout .el-header,
.common-layout .el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}
.common-layout .el-footer {
  line-height: 60px;
}

.common-layout .el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.common-layout .el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.common-layout > .el-container {
  margin-bottom: 40px;
}

.common-layout .el-container:nth-child(5) .el-aside,
.common-layout .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.common-layout .el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
