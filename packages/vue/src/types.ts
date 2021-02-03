import { FunctionHook } from '@json2render/utils'
import { Plugin } from 'vue'

export declare type JRenderPlugin = Plugin & { use: any }

export declare interface HookItem {
  hook: FunctionHook
  index: number
}

export type DatasourceProviders = { [key: string]: any }
