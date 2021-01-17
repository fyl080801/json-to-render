import { isArray, isObject } from 'lodash-es'
import { ProxyFlags, ProxyTarget } from '../../../types'

export const isProxy = (target: unknown) => {
  const proxy = target as ProxyTarget
  return !!((isObject(proxy) || isArray(proxy)) && proxy[ProxyFlags.IS_PROXY])
}

export const isRejectProxy = (target: unknown) => {
  const proxy = target as ProxyTarget
  return !!((isObject(proxy) || isArray(proxy)) && proxy[ProxyFlags.NOT_PROXY])
}

export const isAllowedProxy = (target: unknown) => {
  return (
    !isRejectProxy(target) &&
    (isObject(target) || isArray(target)) &&
    target !== null
  )
}

export const getProperty = (target: any, prop: any) => {
  return Reflect.getOwnPropertyDescriptor(target, prop)
}

export const getPropertyValue = (target: any, prop: any) => {
  getProperty(target, prop)?.value
}
