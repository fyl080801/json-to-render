import { proxy } from './proxy'
import { prerender, render } from './hooks'
import { createServiceBuilder } from '@json-to-render/core'

export const globalServiceBuilder = createServiceBuilder({
  proxy,
  prerender,
  render
})
