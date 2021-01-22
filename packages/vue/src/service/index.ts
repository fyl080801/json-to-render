import { proxy } from './proxy'
import { setup, render } from './hooks'
import { createServiceBuilder } from '@json-to-render/core'

export const globalServiceBuilder = createServiceBuilder({
  proxy,
  setup,
  render
})
