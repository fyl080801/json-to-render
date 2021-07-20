import {
  assignArray,
  assignObject,
  createToken,
  ContainerInstance,
  servicesToken,
  isArray,
} from '@json2render/core'
import { Slots } from '@vue/runtime-core'
import { HookMeta } from '../types'
import { nonArrayFunction } from '../utils/helper'
import pipeline from '../utils/pipeline'
import { resolveChildren } from '../utils/render'

export const prerenderToken = createToken<HookMeta>('prerender')

export const prerenderServiceToken =
  createToken<PrerenderService>('prerenderService')

export const renderToken = createToken<HookMeta>('render')

export const renderServiceToken = createToken<RenderService>('renderService')

export class PrerenderService {
  private hooks: HookMeta[] = []
  private services: Record<string, unknown>

  constructor(container: ContainerInstance) {
    this.hooks = container
      .getMany(prerenderToken)
      .sort((a, b) => a.index - b.index)
    this.services = container.get(servicesToken)
  }

  process(value: any, context: Record<string, unknown>) {
    const innerServices = new Proxy(
      { context },
      {
        get: (target, p, receiver) => {
          if (p === 'context') {
            return Reflect.get(target, p, receiver)
          } else {
            return this.services[p as string]
          }
        },
      }
    )

    return (...extra: HookMeta[]) => {
      pipeline(assignArray(this.hooks, extra || []), innerServices)(value)
    }
  }
}

export class RenderService {
  private hooks: HookMeta[] = []

  constructor(container: ContainerInstance) {
    this.hooks = container
      .getMany(renderToken)
      .sort((a, b) => a.index - b.index)
  }

  process(value: any, context: Record<string, unknown>) {
    return (...extra: HookMeta[]) => {
      pipeline(
        assignArray(this.hooks, extra || []),
        assignObject({ context })
      )(value)
    }
  }
}

export const childrenPrerender = () => (field: any, next: any) => {
  if (!isArray(field.children)) {
    next(field)
    return
  }

  const children = field.children?.filter((child: any) => child) ?? []

  if (children.length <= 0) {
    next(field)
    return
  }

  field.children = resolveChildren(children)

  next(field)
}

export const injectPrerender =
  (nodeField: any) =>
  ({ proxy, context }: any) =>
  (field: any, next: any) => {
    nodeField.value = proxy.inject(field, context)
    next(nodeField.value)
  }

export const slotsPrerender =
  (slots: Slots) => () => (field: any, next: any) => {
    if (!field.children) {
      next(field)
      return
    }

    for (const key in field.children) {
      const slotIncludes = []

      for (let i = 0; i < field.children[key].length; i++) {
        const current = field.children[key][i]

        if (current.component === 'slot') {
          const slotName = current.name || 'default'
          if (typeof slots[slotName] === 'function') {
            slotIncludes.push(() =>
              (slots[slotName] || nonArrayFunction)(current.props)
            )
          }
        } else {
          slotIncludes.push(field.children[key][i])
        }
      }

      field.children[key] = slotIncludes
    }

    next(field)
  }
