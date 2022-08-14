import store from 'store'

import { WEB_CONFIG } from './constant'

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

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isVaildArray(value: any): boolean {
  return isArray(value) && Boolean(value.length)
}

export const replaceDoubleQuotes = (str: string = '') => str.replace(/"/g, '')

export const setWebConfigStore = (value: Dictionary = {}) => {
  return setStorage(WEB_CONFIG, value)
}

export const getWebConfigStore = () => {
  return getStorage(WEB_CONFIG)
}
