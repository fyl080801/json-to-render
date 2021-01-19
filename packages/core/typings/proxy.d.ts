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
