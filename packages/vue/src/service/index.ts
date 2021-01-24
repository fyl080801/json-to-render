import { createProxyService } from './proxy'
import { createHookService } from './hooks'
import { createServiceBuilder } from '@json-to-render/core'

export const proxy = createProxyService()

export const prerender = createHookService()

export const render = createHookService()

export const globalServiceBuilder = createServiceBuilder({
  proxy: proxy.setup,
  prerender: prerender.setup,
  render: render.setup
})
