import { ProxyMatcher, FunctionalMeta, DatasourceMeta } from '@json2render/core'
import { Plugin } from 'vue'

export interface ServiceBuilder {
  proxy: (type: new () => ProxyMatcher) => void
  functional: (type: new () => FunctionalMeta) => void
  datasource: (type: new () => DatasourceMeta) => void
}

export declare type JRenderPlugin = Plugin & { use: any }
