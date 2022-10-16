import request from '../request';

export default {
  getData() {
    return request('ranking/sales/0')
  }
}
