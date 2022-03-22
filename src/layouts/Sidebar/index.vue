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
    const { logo, clsPrefix, title, menuSideWidth, menuSideFoldWidth } =
      useConfig('layout-aside')
    const globalState = useGlobalStore()
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
              <div class="p-t-12" layout-align="center center">
                <img class={`${clsPrefix}-logo`} src={logo} alt={title} />
                <h3 class="text-uppercase color-white m-l-12">{title}</h3>
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
  &-title {
    height: $sideLogoHeight;
  }
  &-fixed {
    position: fixed;
    height: 100%;
  }
  &-logo {
    width: 50px;
    height: 50px;
  }
  &-fold {
    .#{$prefix} {
      &-logo {
        width: 40px;
        height: 40px;
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

// .#{$prefix} {
//   &-fold {
//     .#{$prefix} {
//       &-logo {
//         width: 30px;
//         height: 30px;
//         + h3 {
//           display: none;
//         }
//       }
//     }
//   }
// }
</style>
