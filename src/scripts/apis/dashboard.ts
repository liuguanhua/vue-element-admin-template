import request from '../request';
import { DEFAULT_PAGE_SIZE } from '../constant';

export default {
  getData(options: IPaginationOptions = { pageIndex: 1 }) {
    return request(`ranking/sales/0`, {
      params: {
        pageSize: DEFAULT_PAGE_SIZE,
        ...options
      }
    })
  }
}
