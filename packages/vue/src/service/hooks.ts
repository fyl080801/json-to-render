import { assignArray, pipeline } from '@json-to-render/utils'

const setupMap: FunctionHook[] = []
const renderMap: FunctionHook[] = []

export const addSetup = (hook: FunctionHook) => {
  setupMap.push(hook)
}

export const addRender = (hook: FunctionHook) => {
  renderMap.push(hook)
}

export const getSetupProcess = (...inners: FunctionHook[]): FunctionNext => {
  return pipeline(assignArray([], setupMap, inners))
}

export const getRenderProcess = (): FunctionNext => {
  return pipeline(renderMap)
}
