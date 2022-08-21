<script lang="tsx">
import {
  defineComponent,
  VNodeProps,
  AllowedComponentProps,
  toRef,
  h,
  Fragment,
} from 'vue'
import {
  ElDrawer,
  ElMenu,
  ElAside,
  ElBreadcrumb,
  ElDropdown,
  ElPopover,
  ElTabs,
} from 'element-plus'
import classNames from 'classnames'

import { themeColor, themeSkin, useTheme } from '../hooks'

import styTheme from '@/assets/styles/sass/theme.module.scss'
import { isBoolean } from '@/scripts/utils'

export const BegetThemeContainer = defineComponent({
  props: {
    showThemeColor: {
      type: Boolean,
      default: false,
    },
    showThemeBgColor: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: [Boolean, String],
      default: false,
    },
  },
  setup(props, { slots }) {
    const { showThemeColor, showThemeBgColor, tag } = props
    const { theme } = useTheme()
    return () => {
      const children = slots.default && slots.default()
      const themeColor = styTheme[`theme_color_${theme.value}`]
      const themeBgColor = styTheme[`theme_bgcolor_${theme.value}`]
      const themeClass = {
        [themeColor]: showThemeColor && themeColor,
        [themeBgColor]: showThemeBgColor && themeBgColor,
      }
      return h(
        tag ? isBoolean(tag) ? 'div' : tag : <Fragment></Fragment>,
        {
          ...(tag && { class: themeClass }),
        },
        (children || []).map((child) => {
          child.props = {
            ...child.props,
            class: classNames({
              [child.props?.class]: child.props?.class,
              ...(!tag && themeClass),
            }),
          }
          return child
        })
      )
    }
  },
})

export type TElDrawerProps = InstanceType<typeof ElDrawer>['$props']
type TElDrawerChildProps = {
  -readonly [K in keyof Omit<
    TElDrawerProps,
    keyof VNodeProps | keyof AllowedComponentProps
  >]: TElDrawerProps[K]
}

export const BegetDrawer = defineComponent<TElDrawerProps>({
  inheritAttrs: false,
  props: ElDrawer.props,
  setup(props, { attrs, slots }) {
    const { theme } = useTheme()
    return () => {
      return (
        <div class={`${styTheme[`theme_drawer_${theme.value}`]}`}>
          <ElDrawer
            modelValue={false}
            {...(props as any)}
            {...attrs}
            v-slots={slots}
          ></ElDrawer>
        </div>
      )
    }
  },
})

export type TElMenuProps = InstanceType<typeof ElMenu>['$props']

export const BegetElMenu = defineComponent<TElMenuProps>({
  props: ElMenu.props,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const backgroundColor = toRef(props, 'backgroundColor')
    const className = toRef(props, 'class')
    const textColor = toRef(props, 'textColor')
    const activeTextColor = toRef(props, 'activeTextColor')
    return () => {
      const color = themeSkin[theme.value]
      const isLight = theme.value == 'light'
      return (
        <ElMenu
          {...(props as any)}
          {...{
            class: classNames(`${styTheme[`theme_menu_${theme.value}`]}`, {
              [className.value as string]: className.value,
            }),
            backgroundColor: backgroundColor.value || color,
            textColor:
              textColor.value ||
              (isLight ? '#001529' : themeColor.menuTextColor),
            activeTextColor:
              activeTextColor.value || themeColor.menuActiveTextColor,
          }}
          v-slots={slots}
        ></ElMenu>
      )
    }
  },
})

export type TElAsideProps = InstanceType<typeof ElAside>['$props']

export const BegetElAside = defineComponent<TElAsideProps>({
  props: ElAside.props,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const className = toRef(props, 'class')
    return () => {
      return (
        <ElAside
          {...(props as any)}
          {...{
            class: classNames(`${styTheme[`theme_sider_${theme.value}`]}`, {
              [className.value as string]: className.value,
            }),
          }}
          v-slots={slots}
        ></ElAside>
      )
    }
  },
})

export type TElBreadcrumbProps = InstanceType<typeof ElBreadcrumb>['$props']

export const BegetElBreadcrumb = defineComponent<TElBreadcrumbProps>({
  props: ElBreadcrumb.props,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const className = toRef(props, 'class')
    return () => {
      return (
        <ElBreadcrumb
          {...(props as any)}
          {...{
            class: classNames(
              `${styTheme[`theme_breadcrumb_${theme.value}`]}`,
              {
                [className.value as string]: className.value,
              }
            ),
          }}
          v-slots={slots}
        ></ElBreadcrumb>
      )
    }
  },
})

export type TElDropdownProps = InstanceType<typeof ElDropdown>['$props']

export const BegetElDropdown = defineComponent<TElDropdownProps>({
  props: ElDropdown.props,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const popperClass = toRef(props, 'popperClass')
    return () => {
      return (
        <ElDropdown
          {...(props as any)}
          {...{
            'popper-class': classNames(
              `${styTheme[`theme_dropdown_${theme.value}`]}`,
              {
                [popperClass.value as string]: popperClass.value,
              }
            ),
          }}
          v-slots={slots}
        ></ElDropdown>
      )
    }
  },
})

export type TElPopoverProps = InstanceType<typeof ElPopover>['$props']

export const BegetElPopover = defineComponent<TElPopoverProps>({
  props: ElPopover.props,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const popperClass = toRef(props, 'popperClass')
    return () => {
      return (
        <ElPopover
          {...(props as any)}
          {...{
            'popper-class': classNames(
              `${styTheme[`theme_popover_${theme.value}`]}`,
              {
                [popperClass.value as string]: popperClass.value,
              }
            ),
          }}
          v-slots={slots}
        ></ElPopover>
      )
    }
  },
})

export type TElTabsProps = InstanceType<typeof ElTabs>['$props']

export const BegetElTabs = defineComponent<TElTabsProps>({
  props: ElTabs.props,
  setup(props, { slots }) {
    const { theme } = useTheme()
    const className = toRef(props, 'class')
    return () => {
      return (
        <ElTabs
          {...(props as any)}
          {...{
            class: classNames(`${styTheme[`theme_tabs_${theme.value}`]}`, {
              [className.value as string]: className.value,
            }),
          }}
          v-slots={slots}
        ></ElTabs>
      )
    }
  },
})

export default {}
</script>
