import { Setup } from '@json2render/core'
import { Plugin } from 'vue'

// component
export interface ComponentMeta {
  name: string
  define?: any
  provider?: string
}

// hook
export interface HookNext {
  (scope: any): void
}

export interface HookInvoker {
  (scope: any, next: HookNext): void
}

export interface Hook {
  (services: unknown): HookInvoker
}

export interface HookMeta {
  index: number
  invoke: Hook
}

export declare type FunctionPipeLine = (
  hooks: HookMeta[],
  services: unknown
) => HookNext

export interface HookService {
  process: (value: any, extra: HookMeta[]) => void
}

export declare type JRenderPlugin = Plugin & { use: Setup }
