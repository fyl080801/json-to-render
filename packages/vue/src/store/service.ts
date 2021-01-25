import { provide, inject } from 'vue'

const stateSymbol = Symbol('service')

export const getState = () => inject(stateSymbol)

export const createStore = (state: { [key: string]: any }) => {
  provide(stateSymbol, state)

  return getState
}
