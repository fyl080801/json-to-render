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

export interface ProxyContext {
  model: unknown
  scope: unknown
  [key: string]: unknown
}

export interface ProxyMatcher {
  (value: unknown): ProxyHandler
}

export interface ProxyHandler {
  (context: unknown, services: Record<string, unknown>): unknown
}

// functional
export interface FunctionalMeta {
  name: string
  invoke(...args: unknown[]): unknown
}

// datasource
export interface DatasourceMeta {
  type: string
  build: DatasourceBuilder
}

export interface DatasourceBuilder {
  (props: Record<string, unknown>, services: Record<string, unknown>): unknown
}

export interface DatasourceOptions {
  type: string
  props: Record<string, unknown>
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
