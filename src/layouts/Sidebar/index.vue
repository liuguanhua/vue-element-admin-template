<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import Menu from '../Menu/index.vue'
import { BegetElAside, BegetThemeContainer } from '@/components/common'

import { useConfig } from '@/components/hooks'
import { useGlobalStore } from '@/store/modules/global'

export default defineComponent({
  setup() {
    const globalStore = useGlobalStore()
    const { logo, clsPrefix, title, menuSideWidth, menuSideFoldWidth } =
      useConfig('layout-aside')
    const { isFixedSidebar, collapse, isMobile } = storeToRefs(globalStore)

    return () => {
      const width = collapse.value ? menuSideFoldWidth : menuSideWidth
      return (
        <>
          {isFixedSidebar.value && !isMobile.value && (
            <div
              class={`${clsPrefix}-placeholder`}
              layout-flex="none"
              style={{ width }}
            ></div>
          )}
          <BegetElAside
            class={[
              { [`${clsPrefix}-fixed`]: isFixedSidebar.value },
              clsPrefix,
              {
                [`${clsPrefix}-fold`]: collapse.value && !isMobile.value,
              },
            ]}
            width={isMobile.value ? menuSideWidth : width}
            style={{
              display: !collapse.value || !isMobile.value ? 'block' : 'none',
            }}
          >
            <RouterLink class={`${clsPrefix}-title block`} to="/">
              <BegetThemeContainer showThemeBgColor showThemeColor>
                <div layout-align="center center">
                  <img class={`${clsPrefix}-logo`} src={logo} alt={title} />
                  <h3 class="text-uppercase m-l-12 ellipsis r-m-p">{title}</h3>
                </div>
              </BegetThemeContainer>
            </RouterLink>
            <Menu />
          </BegetElAside>
        </>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('layout-aside');

.#{$prefix} {
  transition: width 0.2s;
  &-placeholder {
    transition: width 0.2s;
  }
  &-title > div {
    height: $sideLogoHeight;
  }
  &-fixed {
    position: fixed;
    height: 100%;
    z-index: 11;
  }
  &-logo {
    width: 40px;
    height: 35px;
  }
  &-fold {
    .#{$prefix} {
      &-logo {
        + h3 {
          display: none;
        }
      }
    }
    :deep() {
      .sider-menu-title > span,
      .el-menu > a span {
        display: none;
      }
      .is-active .el-sub-menu__title {
        background-color: var(--color-primary-0) !important;
        .el-icon {
          color: var(--color-white);
        }
      }
    }
  }
}
</style>
