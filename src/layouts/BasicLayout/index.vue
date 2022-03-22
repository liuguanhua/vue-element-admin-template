<script lang="tsx">
import { defineComponent, KeepAlive, Transition, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { ElContainer, ElFooter, ElMain } from 'element-plus'

import Sidebar from '../Sidebar/index.vue'
import Header from '../Header/index.vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const key = computed(() => route.path)
    return () => {
      return (
        <ElContainer class="min-h-100">
          <Sidebar />
          <ElContainer>
            <Header />
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
            <ElFooter></ElFooter>
          </ElContainer>
        </ElContainer>
      )
    }
  },
  render() {},
})
</script>
