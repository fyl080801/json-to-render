import { provide, inject } from 'vue'

const stateSymbol = Symbol('store')

export const getState = () => inject(stateSymbol)

export const createStore = (state: { [key: string]: any }) => {
  provide(stateSymbol, state)

  return getState
}
