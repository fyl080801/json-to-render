import { forEachTarget, isArray, isObject } from '@json-to-render/utils'

export enum ProxyFlags {
  IS_PROXY = '__jr_isProxy',
  NOT_PROXY = '__jr_notProxy',
  PROXY_DEFINE = '__jr_proxyDefine'
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

export const getProxyDefine = (target: any) => {
  const result = isProxy(target) ? target[ProxyFlags.PROXY_DEFINE] : target
  forEachTarget(result, (value: any, prop: any, collection: any) => {
    collection[prop] = getProxyDefine(value)
  })
  return result
}
