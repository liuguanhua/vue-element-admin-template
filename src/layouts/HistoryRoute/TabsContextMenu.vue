<script lang="tsx">
import { defineComponent } from 'vue'
import { ElMenu, ElMenuItem, ElDivider } from 'element-plus'

import { ElSvgIcon } from '@/components/common'

import { EContextMenuOperates } from '@/types/enum.d'

type Props = InstanceType<typeof ElMenu>['$props']

export default defineComponent<Props>({
  setup() {
    return () => {
      return (
        <ElMenu defaultActive="-1" class="contextmenu">
          <ElMenuItem index={EContextMenuOperates.refresh}>
            <ElSvgIcon name="RefreshRight" />
            重新加载
          </ElMenuItem>
          <ElMenuItem index={EContextMenuOperates.close}>
            <ElSvgIcon name="Close" />
            关闭标签
          </ElMenuItem>
          <ElDivider />
          <ElMenuItem index={EContextMenuOperates.left}>
            <ElSvgIcon name="Back" />
            关闭左侧
          </ElMenuItem>
          <ElMenuItem index={EContextMenuOperates.right}>
            <ElSvgIcon name="Right" />
            关闭右侧
          </ElMenuItem>
          <ElDivider />
          <ElMenuItem index={EContextMenuOperates.other}>
            <ElSvgIcon name="ScaleToOriginal" />
            关闭其他
          </ElMenuItem>
          <ElMenuItem index={EContextMenuOperates.all}>
            <ElSvgIcon name="Minus" />
            关闭所有
          </ElMenuItem>
        </ElMenu>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  z-index: 2;
  position: absolute;
  padding: 5px 0;
  border-radius: 5px;
  color: #333;
  border-right: 0;
  width: 121px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .el-menu-item {
    height: 30px;
    line-height: 30px;
    &.is-active {
      color: initial;
    }
  }
  .el-icon {
    margin-left: -4px;
  }
  .el-divider--horizontal {
    margin: 5px 0;
  }
}
</style>
