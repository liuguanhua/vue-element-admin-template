interface Dictionary<T = any> {
  [index: string]: T
}

type DictionaryArray<T = any> = Dictionary<T>[]

declare const TThemeFields: ['light', 'dark', 'purple', 'orange', 'pink']

declare type TThemeField = typeof TThemeFields[number]


declare interface IRequestType<DP = Dictionary> {
  data?: DP
  params?: DP & {
    pageSize?: number
    pageIndex?: number
  }
  method?: 'get' | 'post'
  customApi?: boolean
  commonTips?: boolean
  errTips?: boolean
  success?: (result: any) => void
  error?: (result: any) => void
}


declare interface Window {
  APP_CONFIG: {
    apiRoot: string
  }
}
