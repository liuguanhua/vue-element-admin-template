<script lang="tsx">
import { defineComponent, computed } from 'vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useGlobalStore } from '@/store/modules/global'
import MenuItem from './MenuItem.vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const globalState = useGlobalStore()
    const {
      routes,
      collapse,
      menuSideBgColor,
      menuTextColor,
      menuActiveTextColor,
    } = storeToRefs(globalState)
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })
    return () => {
      return (
        <ElScrollbar>
          <ElMenu
            backgroundColor={menuSideBgColor.value}
            defaultActive={activeMenu.value}
            collapse={collapse.value}
            textColor={menuTextColor.value}
            activeTextColor={menuActiveTextColor.value}
          >
            {routes.value.map((route) => (
              <MenuItem key={route.path} route={route} />
            ))}
          </ElMenu>
        </ElScrollbar>
      )
    }
  },
})
</script>
