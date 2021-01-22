import { provide, inject, reactive } from 'vue'

const stateSymbol = Symbol('service')

export const getState = () => inject(stateSymbol)

export const createStore = (context: { [key: string]: any }) => {
  const state = Object.keys(context).reduce((pre: any, cur) => {
    pre[cur] = pre[cur] || reactive(context[cur])
    return pre
  }, {})

  provide(stateSymbol, state)

  return getState
}
