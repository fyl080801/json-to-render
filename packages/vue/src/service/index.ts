import {
  assignObject,
  createServiceContainer,
  createCoreSetup,
  Setup,
} from '@json2render/core'
import { prerenderToken, renderToken } from '../feature/hook'
import { Hook } from '../types'

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
