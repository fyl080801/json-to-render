/// <reference types="@vue/runtime-core"/>

declare type JRenderPlugin = Plugin & { use: any }

declare interface HookItem {
  hook: FunctionHook
  index: number
}
