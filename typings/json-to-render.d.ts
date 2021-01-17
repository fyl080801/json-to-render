declare interface JField {
  component: string
  props?: any
  children?: JFieldArray | { [key: string]: any }
  [x: string]: any
}

declare type JFieldArray = Array<JField>

declare type FunctionNext = (scope: any) => void

declare type FunctionHook = (scope: any, next: FunctionNext) => void

declare type FunctionPipeLine = (funcs: FunctionHook[]) => FunctionNext

declare const enum ProxyFlags {
  IS_PROXY,
  NOT_PROXY
}

declare interface ProxyTarget {
  [ProxyFlags.IS_PROXY]?: boolean
  [ProxyFlags.NOT_PROXY]?: boolean
}

// proxy 上下文
declare type ProxyContext = { [key: string]: unknown }
// 返回真实对象
declare type JProxyHandler = () => unknown
//
declare type ProxyHandlerFactory<T = any> = (
  target: T,
  context: ProxyContext
) => JProxyHandler | false | null
// 经典转换类型
// export interface Proxy
declare interface ClassicTransform {
  $type: string
}
declare interface RawTransform extends ClassicTransform {
  $value: unknown
}
declare interface ConditionTransform extends ClassicTransform {
  $condition: unknown
  $value: unknown
}
declare interface BindTransform extends ClassicTransform {
  $source: string
}
declare interface FunctionTransform extends ClassicTransform {
  $model: string
  $result: string
}
