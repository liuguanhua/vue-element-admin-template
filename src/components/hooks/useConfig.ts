import { ElPagination } from 'element-plus'

import settings from '@/config/settings'
import { DEFAULT_PAGE_SIZE, DEVICE_WIDTH } from '@/scripts'

const { clsPrefix, ...rest } = settings

const useConfig = (cls?: string): Dictionary & {
  clsPrefix: string
} => {
  return {
    clsPrefix: `${clsPrefix}${cls ? `-${cls}` : ''}`,
    getPaginationProps(): InstanceType<typeof ElPagination>['$props'] {
      const isMobile = window.innerWidth <= DEVICE_WIDTH
      return {
        layout: isMobile ? 'total, pager,' : 'total, sizes, prev, pager, next, jumper',
        pageSizes: [DEFAULT_PAGE_SIZE, 20, 30, 40, 50, 100],
        pagerCount: isMobile ? 5 : 7
      }
    },
    ...rest,
  }
}
export default useConfig
