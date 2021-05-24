import { createServieProvider } from './utils'

export const functionalServiceProvider =
  createServieProvider<(...args: any[]) => any>()
