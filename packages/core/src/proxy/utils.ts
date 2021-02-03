import {
  assignArray,
  assignObject,
  forEachTarget,
  isArray,
  isObject,
} from '@json2render/utils'
import { ProxyFlags } from '../types'

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
    !!target && !isRejectProxy(target) && (isObject(target) || isArray(target))
  )
}

export const getProperty = (target: any, prop: any) => {
  return Reflect.getOwnPropertyDescriptor(target, prop)
}

export const getProxyDefine = (target: any) => {
  if (!isArray(target) && !isObject(target)) {
    return target
  }

  const assign = isArray(target) ? assignArray : assignObject

  const result = assign(
    isProxy(target) ? target[ProxyFlags.PROXY_DEFINE] : target
  )

  forEachTarget(result, (value: any, prop: any) => {
    result[prop] = getProxyDefine(value)
  })

  return result
}
