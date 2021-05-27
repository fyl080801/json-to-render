// import {
//   // assignArray,
//   // FunctionHook,
//   // FunctionNext,
//   pipeline,
// } from '@json2render/utils'
// import { HookItem } from '../types'

import { assignArray, FunctionHook, pipeline } from '../utils'

// export const createHookSetup = (store: HookItem[]) => {
//   return (hook: FunctionHook, index?: number) => {
//     store.push({ hook, index: index || 0 })
//   }
// }

// export const createHookService = (inits?: HookItem[]) => {
//   const store = assignArray(inits || [])

//   const processHook = (
//     extras: FunctionHook[] = [],
//     opts: any
//   ): FunctionNext => {
//     const hooks = assignArray(
//       assignArray(store)
//         .sort((a, b) => a.index - b.index)
//         .map((item) => item.hook),
//       extras
//     )
//     return pipeline(hooks, opts)
//   }

//   return {
//     store,
//     setup: createHookSetup(store),
//     processHook,
//   }
// }

export class HookService {
  constructor(private readonly hooks: FunctionHook[]) {}

  invoke(extras: FunctionHook[]) {
    const sorted = assignArray(
      this.hooks.sort((a, b) => a.index - b.index),
      extras
    )

    return pipeline(sorted, {})
  }
}
