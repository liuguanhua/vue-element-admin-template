<script lang="tsx">
import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

import { isExternal } from '@/scripts'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    const { to } = props
    const isExtraLink = isExternal(to)
    return () => {
      const children = slots.default && slots.default()
      if (isExtraLink) {
        return (
          <a target="_blank" rel="noopener" href={to}>
            {children}
          </a>
        )
      }
      return <RouterLink to={to}>{children}</RouterLink>
    }
  },
})
</script>
