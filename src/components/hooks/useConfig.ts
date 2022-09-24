import settings from '@/config/settings'

const { clsPrefix, ...rest } = settings

const useConfig = (cls?: string): Dictionary & {
  clsPrefix: string
} => {
  return {
    clsPrefix: `${clsPrefix}${cls ? `-${cls}` : ''}`,
    ...rest,
  }
}
export default useConfig
