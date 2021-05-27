// import { FunctionHook } from '@json2render/utils'
import { FunctionalBase, ProxyBase } from '@json2render/core'
import { Plugin } from 'vue'

export declare type JRenderPlugin = Plugin & { use: any }

// export declare interface HookItem {
//   hook: FunctionHook
//   index: number
// }

// export declare type DatasourceProviders = { [key: string]: any }

export interface ServiceBuilder {
  proxy: (type: new () => ProxyBase) => void
  functional: (type: new () => FunctionalBase) => void
}
