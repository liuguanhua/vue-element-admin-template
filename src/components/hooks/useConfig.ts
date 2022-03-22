import settings from '@/config/settings'

const { clsPrefix, ...rest } = settings

const useConfig = (cls?: string): Dictionary => {
  return {
    clsPrefix: cls ? `${clsPrefix}-${cls}` : clsPrefix,
    ...rest,
  }
}
export default useConfig
