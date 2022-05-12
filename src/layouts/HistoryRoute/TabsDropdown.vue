<script lang="tsx">
import { defineComponent } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
export default defineComponent({
  setup() {
    return () => {
      return (
        <ElDropdown
          trigger="contextmenu"
          v-slots={{
            dropdown: () => {
              return (
                <ElDropdownMenu>
                  <ElDropdownItem>你好 </ElDropdownItem>
                  <ElDropdownItem>退出登录</ElDropdownItem>
                </ElDropdownMenu>
              )
            },
          }}
        >
        </ElDropdown>
      )
    }
  },
})
</script>
