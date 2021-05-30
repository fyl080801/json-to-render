import { ProxyMatcher, FunctionalMeta, DatasourceMeta } from '@json2render/core'
import { Plugin } from 'vue'

export interface ServiceBuilder {
  proxy: (type: new () => ProxyMatcher) => void
  functional: (type: new () => FunctionalMeta) => void
  datasource: (type: new () => DatasourceMeta) => void
}

export interface SetupHandler {
  (setups: ServiceBuilder): void
}

export interface Setup {
  (handler: SetupHandler): void
}

export declare type JRenderPlugin = Plugin & { use: Setup }
