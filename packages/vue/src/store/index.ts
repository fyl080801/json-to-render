import { provide, inject } from 'vue'

const stateSymbol = Symbol('store')

export const getState = <T>() => inject<T>(stateSymbol)

export const createStore = <T>(state: T) => {
  provide(stateSymbol, state)

  return getState
}
