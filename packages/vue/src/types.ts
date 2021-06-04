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
  proxy: (type: ProxyMatcher) => void
  functional: (type: FunctionalMeta) => void
  datasource: (type: DatasourceMeta) => void
  prerender: (type: FunctionHook) => void
  render: (type: FunctionHook) => void
}

export interface SetupHandler {
  (setups: ServiceBuilder): void
}

export interface Setup {
  (handler: SetupHandler): void
}

export declare type JRenderPlugin = Plugin & { use: Setup }
