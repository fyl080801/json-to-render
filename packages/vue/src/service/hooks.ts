import { assignArray, pipeline } from '@json-to-render/utils'

export const createHookSetup = (store: FunctionHook[]) => {
  return (hook: FunctionHook) => {
    store.push(hook)
  }
}

export const createHookService = (inits?: any[]) => {
  const store = assignArray(inits || [])

  const processHook = (
    extras: FunctionHook[] = [],
    opts: any
  ): FunctionNext => {
    return pipeline(assignArray(store, extras), opts)
  }

  return {
    store,
    setup: createHookSetup(store),
    processHook
  }
}
