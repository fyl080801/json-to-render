import { assignArray, pipeline } from '@json-to-render/utils'

const setupMap: FunctionHook[] = []

const renderMap: FunctionHook[] = []

export const createHookService = (store: FunctionHook[]) => {
  return (hook: FunctionHook) => {
    store.push(hook)
  }
}

export const getSetupProcess = (...inners: FunctionHook[]): FunctionNext => {
  return pipeline(assignArray([], setupMap, inners))
}

export const getRenderProcess = (): FunctionNext => {
  return pipeline(renderMap)
}

export const setup = createHookService(setupMap)

export const render = createHookService(renderMap)
