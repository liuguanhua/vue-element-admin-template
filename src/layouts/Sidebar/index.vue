<script lang="tsx">
import { defineComponent } from 'vue'
import { ElAside } from 'element-plus'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import Menu from '../Menu/index.vue'

import { useConfig } from '@/components/hooks'
import { useGlobalStore } from '@/store/modules/global'

export default defineComponent({
  setup() {
    const globalState = useGlobalStore()
    const { logo, clsPrefix, title, menuSideWidth, menuSideFoldWidth } =
      useConfig('layout-aside')
    const { isFixedSidebar, collapse } = storeToRefs(globalState)

    return () => {
      const width = collapse.value ? menuSideFoldWidth : menuSideWidth
      return (
        <>
          {isFixedSidebar.value && <div style={{ width }}></div>}
          <ElAside
            class={[
              { [`${clsPrefix}-fixed`]: isFixedSidebar.value },
              clsPrefix,
              {
                [`${clsPrefix}-fold`]: collapse.value,
              },
            ]}
            width={width}
          >
            <RouterLink class={`${clsPrefix}-title block`} to="/">
              <div layout-align="center center">
                <img class={`${clsPrefix}-logo`} src={logo} alt={title} />
                <h3 class="text-uppercase color-white m-l-12 ellipsis r-m-p">
                  {title}
                </h3>
              </div>
            </RouterLink>
            <Menu />
          </ElAside>
        </>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$cls: 'layout-aside';
$prefix: #{$clsPrefix}-#{$cls};

.#{$prefix} {
  background-color: var(--color-dark);
  transition: width 0.2s;
  &-title > div {
    height: $sideLogoHeight;
  }
  &-fixed {
    position: fixed;
    height: 100%;
    z-index: 1;
  }
  &-logo {
    width: 40px;
    height: 40px;
  }
  &-fold {
    .#{$prefix} {
      &-logo {
        + h3 {
          display: none;
        }
      }
    }
  }
}
</style>
<style lang="scss">
$cls: 'layout-aside';
$prefix: #{$clsPrefix}-#{$cls};

.#{$prefix} {
  &-fold {
    .sider-menu-title > span {
      visibility: hidden;
    }
    .el-menu > a span {
      visibility: hidden;
    }
  }
}
</style>
