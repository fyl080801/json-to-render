// proxy
export enum ProxyFlags {
  IS_PROXY = '__jr_isProxy',
  NOT_PROXY = '__jr_notProxy',
  PROXY_DEFINE = '__jr_proxyDefine',
}

export interface ProxyTarget {
  [ProxyFlags.IS_PROXY]?: boolean
  [ProxyFlags.NOT_PROXY]?: boolean
}

export interface ProxyBase {
  invoke(value: unknown): ProxyHandler
}

export interface ProxyContext {
  model: unknown
  scope: unknown
  refs: { [key: string]: unknown }
  [key: string]: unknown
}

export interface ProxyHandler {
  (context: unknown): unknown
}

// functional
export interface FunctionalBase {
  name: string
  invoke(...args: unknown[]): unknown
}

// hook
export interface FunctionNext {
  (scope: any): void
}

export interface FunctionHook {
  index: number
  invoke(services: unknown): (scope: any, next: FunctionNext) => void
}

export declare type FunctionPipeLine = (
  hooks: FunctionHook[],
  services: unknown
) => FunctionNext
