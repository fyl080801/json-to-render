import {
  assignArray,
  FunctionHook,
  FunctionNext,
  pipeline
} from '@json-to-render/utils'
import { HookItem } from '../types'

export const createHookSetup = (store: HookItem[]) => {
  return (hook: FunctionHook, index?: number) => {
    store.push({ hook, index: index || 0 })
  }
}

export const createHookService = (inits?: HookItem[]) => {
  const store = assignArray(inits || [])

  const processHook = (
    extras: FunctionHook[] = [],
    opts: any
  ): FunctionNext => {
    const hooks = assignArray(
      assignArray(store)
        .sort((a, b) => a.index - b.index)
        .map(item => item.hook),
      extras
    )
    return pipeline(hooks, opts)
  }

  return {
    store,
    setup: createHookSetup(store),
    processHook
  }
}
