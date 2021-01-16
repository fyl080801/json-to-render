import { isArray, isObject } from 'lodash-es'
import { ProxyFlags, ProxyTarget } from '../../../types'

export const isProxy = (target: unknown) => {
  const proxy = target as ProxyTarget
  return !!((isObject(proxy) || isArray(proxy)) && proxy[ProxyFlags.IS_PROXY])
}

export const canProxy = (target: unknown) => {
  return (
    (isObject(target) || isArray(target)) &&
    target !== null &&
    target !== undefined
  )
}

export const getProperty = (target: any, prop: any) => {
  return Reflect.getOwnPropertyDescriptor(target, prop)
}

export const getPropertyValue = (target: any, prop: any) => {
  getProperty(target, prop)?.value
}
