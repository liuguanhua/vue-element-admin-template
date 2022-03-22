<script lang="tsx">
import { defineComponent } from 'vue'
import { ElAside } from 'element-plus'
import { RouterLink } from 'vue-router'

import { useConfig } from '@/components/hooks'

import Menu from '../Menu/index.vue'

export default defineComponent({
  setup() {
    const { logo, clsPrefix, title } = useConfig('layout-aside')
    return () => {
      return (
        <ElAside class={`${clsPrefix}`} width="200px">
          <RouterLink to="/">
            <div class="p-t-12" layout-align="center center">
              <img class={`${clsPrefix}-logo`} src={logo} alt={title} />
              <h3 class="text-uppercase color-white m-l-12">{title}</h3>
            </div>
          </RouterLink>
          <Menu />
        </ElAside>
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
  &-logo {
    width: 50px;
    height: 50px;
  }
}
</style>
