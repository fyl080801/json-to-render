export enum ProxyFlags {
  IS_PROXY = '__jr_isProxy',
  NOT_PROXY = '__jr_notProxy',
  PROXY_DEFINE = '__jr_proxyDefine',
}

export declare interface ProxyTarget {
  [ProxyFlags.IS_PROXY]?: boolean
  [ProxyFlags.NOT_PROXY]?: boolean
}

// proxy 上下文
export declare interface ProxyContext {
  [key: string]: unknown
}

export declare interface ProxyHandler {
  (context: ProxyContext): unknown
}

// 返回真实对象
export declare interface ProxyMatcher {
  (value: any): ProxyHandler | void | false | null | undefined
}

export declare interface ProxyInjector {
  (target: any, context: any): any
}

export declare interface ServiceRegistration<T> {
  service: T
  index: number
}

export declare interface ServiceStore<T> {
  [key: string]: ServiceRegistration<T>
}

export declare interface ServiceSetup<T> {
  (name: string, service: T, index?: number | undefined): void
}

export declare interface ServiceProvider<T> {
  setup: ServiceSetup<T>
  resolveAll: (excludes?: string[]) => T[]
  resolve: (name: string) => T
}

export declare type ProxySetup = ServiceSetup<ProxyMatcher>

export declare type FunctionalSetup = ServiceSetup<(...args: any[]) => any>
