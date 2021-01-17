import { isArray, isObject } from './helpers'

export enum ProxyFlags {
  IS_PROXY = '__jr_isProxy',
  NOT_PROXY = '__jr_notProxy'
}

export const isProxy = (target: unknown) => {
  const proxy: any = target
  return !!((isObject(proxy) || isArray(proxy)) && proxy[ProxyFlags.IS_PROXY])
}

export const isRejectProxy = (target: unknown) => {
  const proxy: any = target
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
