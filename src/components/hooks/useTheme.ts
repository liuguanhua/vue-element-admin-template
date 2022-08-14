import { inject } from 'vue'

import { isString, replaceDoubleQuotes, THEME_CONFIG_KEY } from '@/scripts'
import styTheme from '@/assets/styles/sass/theme.module.scss'

export const useTheme = () => {
  return inject<any>(THEME_CONFIG_KEY)
}

function generateTheme(themeKey: string) {
  if (isString(styTheme[themeKey])) {
    const themeList = styTheme[themeKey].split(',')
    return themeList.reduce((skin, item) => {
      if (isString(item)) {
        const [type, color] = item.split(' ').filter(Boolean)
        const field = replaceDoubleQuotes(type)
        skin = {
          ...skin,
          [field]: replaceDoubleQuotes(color),
        }
      }
      return skin
    }, {})
  }
  return {}
}

export const themeSkin: Dictionary = generateTheme('themeBackgroundColorList')
export const themeColor: Dictionary = generateTheme('themeFontColorList')
