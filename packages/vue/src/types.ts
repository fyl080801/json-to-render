import {
  ProxyMatcher,
  DatasourceBuilder,
  Hook,
  HookMeta,
  Functional,
} from '@json2render/core'
import { Plugin } from 'vue'

export interface HookService {
  process: (value: any, extra: HookMeta[]) => void
}

export interface ServiceBuilder {
  proxy: (value: ProxyMatcher) => void
  functional: (name: string, value: Functional) => void
  datasource: (name: string, value: DatasourceBuilder) => void
  prerender: (value: Hook, index?: number) => void
  render: (value: Hook, index?: number) => void
}

export interface SetupHandler {
  (setups: ServiceBuilder): void
}

export interface Setup {
  (handler: SetupHandler): void
}

export declare type JRenderPlugin = Plugin & { use: Setup }
