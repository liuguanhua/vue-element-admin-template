<script lang="tsx">
import { defineComponent, ref } from 'vue'
import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElButton,
} from 'element-plus'
export default defineComponent({
  setup() {
    const refDropdown = ref()

    const toggle = (visible: boolean) => {
      if (visible) {
        refDropdown.value.handleClose()
      } else {
        refDropdown.value.handleOpen()
      }
    }
    return {
      toggle,
      refDropdown: (ref) => {
        refDropdown.value = ref //需要重新绑定 why？
      },
    }
  },
  render() {
    return (
      <ElDropdown
        trigger="contextmenu"
        ref={this.refDropdown}
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
      ></ElDropdown>
    )
  },
})
</script>
