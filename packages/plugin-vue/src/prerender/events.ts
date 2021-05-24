import { getProxyDefine } from '@json2render/core'
import { FunctionHook, isArray } from '@json2render/utils'

const hook: FunctionHook = ({ injectProxy, context }) => {
  return (field, next) => {
    if (field.events == undefined) {
      next(field)
      return
    }

    const define = getProxyDefine(field.events)

    field.props = field.props || {}

    if (isArray(define)) {
      const events = define.reduce((props: any, evt: any) => {
        props[evt.name] = props[evt.name] || []

        props[evt.name].push(evt)

        return props
      }, {})

      field.props = Object.keys(events).reduce((props, key) => {
        props[`on${key.charAt(0).toUpperCase() + key.slice(1)}`] = (
          ...args: any
        ) => {
          events[key].forEach((evt: any) => {
            injectProxy(evt, context)?.handler(...args)
          })
        }
        return props
      }, field.props)
    }

    next(field)
  }
}

export default hook
