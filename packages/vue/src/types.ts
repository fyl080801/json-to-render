import { FunctionHook } from '@json2render/utils'
import { FunctionalSetup, ProxySetup } from '@json2render/core'
import { Plugin } from 'vue'

export declare interface ServiceSetupFactory {
  (setup: (services: ServiceSetups) => void): void
}

export declare type SetupInitialization = (
  setup: (setups: ServiceSetups) => void
) => void

export declare type JRenderPlugin = Plugin & {
  use: SetupInitialization
}

export declare interface HookItem {
  hook: FunctionHook
  index: number
}

export declare interface DatasourceProviders {
  [key: string]: any
}

export declare interface ServiceSetups {
  proxy: ProxySetup
  functional: FunctionalSetup
}
