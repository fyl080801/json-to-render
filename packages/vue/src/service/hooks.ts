import { assignArray, pipeline } from '@json-to-render/utils'

export const createHookSetup = (store: FunctionHook[]) => {
  return (hook: FunctionHook) => {
    store.push(hook)
  }
}

export const createHookService = (inits?: any[]) => {
  const store: any[] = assignArray([], inits || [])

  const processHook = (...extras: FunctionHook[]): FunctionNext => {
    return pipeline(assignArray([], store, extras || []))
  }

  return {
    store,
    setup: createHookSetup(store),
    processHook
  }
}
