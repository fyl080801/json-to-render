import {
  ProxyMatcher,
  FunctionalMeta,
  DatasourceMeta,
  FunctionHook,
} from '@json2render/core'
import { Plugin } from 'vue'

export interface HookService {
  process: (value: any, extra: FunctionHook[]) => void
}

export interface ServiceBuilder {
  proxy: (type: new () => ProxyMatcher) => void
  functional: (type: new () => FunctionalMeta) => void
  datasource: (type: new () => DatasourceMeta) => void
  prerender: (type: new () => FunctionHook) => void
  render: (type: new () => FunctionHook) => void
}

export interface SetupHandler {
  (setups: ServiceBuilder): void
}

export interface Setup {
  (handler: SetupHandler): void
}

export declare type JRenderPlugin = Plugin & { use: Setup }
