export declare interface ServiceBuilderFactory {
  (services: any): (builder: Function) => void
}

export enum ProxyFlags {
  IS_PROXY = '__jr_isProxy',
  NOT_PROXY = '__jr_notProxy',
  PROXY_DEFINE = '__jr_proxyDefine'
}

export declare interface ProxyTarget {
  [ProxyFlags.IS_PROXY]?: boolean
  [ProxyFlags.NOT_PROXY]?: boolean
}

// proxy 上下文
export declare type ProxyContext = { [key: string]: unknown }

// 返回真实对象
export declare type JProxyHandler = (
  context: any,
  services: { [key: string]: any }
) => unknown

//
export declare type ProxyHandlerResolver<T = any> = (
  target: T
) => JProxyHandler | undefined
