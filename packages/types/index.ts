export interface JField {
  component: string
  props?: any
  children?: JFieldArray | { [key: string]: any }
  [x: string]: any
}

export type JFieldArray = Array<JField>

export type FunctionNext = (scope: any) => void

export type FunctionHook = (scope: any, next: FunctionNext) => void

export type FunctionPipeLine = (funcs: FunctionHook[]) => FunctionNext

export enum ProxyFlags {
  IS_PROXY = '__jr_isProxy',
  NOT_PROXY = '__jr_notProxy'
}

export interface ProxyTarget {
  [ProxyFlags.IS_PROXY]?: boolean
  [ProxyFlags.NOT_PROXY]?: boolean
}

// proxy 上下文
export type ProxyContext = { [key: string]: unknown }
// 返回真实对象
export type ProxyHandler = () => unknown
//
export type ProxyHandlerFactory<T = any> = (
  target: T,
  context: ProxyContext
) => ProxyHandler | false | null
// 经典转换类型
// export interface Proxy
export interface ClassicTransform {
  $type: string
}
export interface RawTransform extends ClassicTransform {
  $value: unknown
}
export interface ConditionTransform extends ClassicTransform {
  $condition: unknown
  $value: unknown
}
export interface BindTransform extends ClassicTransform {
  $source: string
}
export interface UpdateTransform extends ClassicTransform {
  $model: string
  $result: string
}
export interface FunctionTransform extends ClassicTransform {
  $result: string
}
