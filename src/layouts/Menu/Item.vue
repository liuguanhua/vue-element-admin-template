<script lang="tsx">
import { defineComponent } from 'vue'

import { SvgIcon, ElSvgIcon } from '@/components/common'

export default defineComponent({
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: '',
    },
    elIcon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { elIcon, title, icon } = props
    return () => {
      return (
        <>
          {icon && <SvgIcon name={icon} />}
          {elIcon && <ElSvgIcon name={elIcon} />}
          {title && (
            <span class={[{ 'no-icon-title': !icon && !elIcon }, 'vam']}>
              {title}
            </span>
          )}
        </>
      )
    }
  },
})
</script>
