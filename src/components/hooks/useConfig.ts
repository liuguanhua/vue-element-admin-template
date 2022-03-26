import settings from '@/config/settings'

const { clsPrefix, ...rest } = settings

const useConfig = (cls?: string): Dictionary => {
  return {
    clsPrefix: `${clsPrefix}${cls ? `-${cls}` : ''}`,
    ...rest,
  }
}
export default useConfig
