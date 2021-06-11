import {
  assignObject,
  createServiceContainer,
  createCoreSetup,
  Setup,
} from '@json2render/core'
import { componentToken } from '../feature'
import { prerenderToken, renderToken } from '../feature/hook'
import { ComponentMeta, Hook } from '../types'

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

  const componentSetup = (name: string, options?: any) => {
    const meta: ComponentMeta = {
      name,
      provider: options?.provider,
    }

    container.addValue(componentToken, meta)

    return (define: any) => {
      meta.define = define
    }
  }

  return assignObject(createCoreSetup(container), {
    prerender: prerenderSetup,
    render: renderSetup,
    component: componentSetup,
  })
}

export const globalSetup: Setup = (handler) => {
  handler(createSetup(containerBuilder))
}
