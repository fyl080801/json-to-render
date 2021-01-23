import { assignArray, pipeline } from '@json-to-render/utils'

const prerenderMap: FunctionHook[] = []

const renderMap: FunctionHook[] = []

export const createHookService = (store: FunctionHook[]) => {
  return (hook: FunctionHook) => {
    store.push(hook)
  }
}

export const getPrerenderProcess = (
  ...inners: FunctionHook[]
): FunctionNext => {
  return pipeline(assignArray([], prerenderMap, inners))
}

export const getRenderProcess = (): FunctionNext => {
  return pipeline(renderMap)
}

export const prerender = createHookService(prerenderMap)

export const render = createHookService(renderMap)
