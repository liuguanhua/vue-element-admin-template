import store from 'store'

export function replaceState(oldState: Dictionary, newState: Dictionary) {
  const result = Object.assign({}, oldState, newState)
  return result
}

export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function deepCopy(value: Dictionary) {
  return JSON.parse(JSON.stringify(value))
}

/**
 * 设置本地存储
 * @export
 * @template T
 * @param {string} key
 * @param {T} value
 * @param {boolean} [isReassign=false]
 */
export function setStorage<T>(
  key: string,
  value: T,
  isReassign: boolean = false
) {
  if (isObject(value)) {
    value['timestamp'] = +new Date()
    if (!isReassign) {
      const oldStoreData = getStorage(key)
      value = {
        ...oldStoreData,
        ...value,
      }
    }
  }
  store.set(key, value)
}

/**
 * 获取本地存储
 * @export
 * @param {string} key
 * @param {boolean} [isDefaultEmptyObject=true]
 * @return {*}
 */
export function getStorage(key: string, isDefaultEmptyObject: boolean = true) {
  return store.get(key) || (isDefaultEmptyObject ? {} : void 0)
}

export function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}
