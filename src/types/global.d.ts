interface Dictionary<T = any> {
  [index: string]: T
}

type DictionaryArray<T = any> = Dictionary<T>[]

declare const TThemeFields: ['light', 'dark', 'purple', 'orange', 'pink']

declare type TThemeField = typeof TThemeFields[number]
