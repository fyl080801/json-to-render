import {
  assignObject,
  createServiceContainer,
  createCoreSetup,
} from '@json2render/core'
import { Setup, Hook } from '../types'
import { prerenderToken, renderToken } from '../feature/hook'

export const containerBuilder = createServiceContainer()

export const createSetup = (container: any) => {
  const prerenderSetup = (value: Hook, index?: number) => {
    container.addValue(prerenderToken, { index: index || 0, invoke: value })
  }

  const renderSetup = (value: Hook, index?: number) => {
    container.addValue(renderToken, {
      index: index || 0,
      invoke: value,
    })
  }

  return assignObject(createCoreSetup(container), {
    prerender: prerenderSetup,
    render: renderSetup,
  })
}

export const globalSetup: Setup = (handler) => {
  handler(createSetup(containerBuilder))
}
