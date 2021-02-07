import { getProxyDefine } from '@json2render/core'
import { assignObject, FunctionHook, isArray } from '@json2render/utils'

const hook: FunctionHook = ({ injectProxy, context }) => {
  return (field, next) => {
    if (field.events == undefined) {
      next(field)
      return
    }

    const define = getProxyDefine(field.events)

    field.props = field.props || {}

    if (isArray(define)) {
      const evts = define.reduce((props, evt) => {
        props[evt.name] = props[evt.name] || []

        props[evt.name].push(evt)

        return props
      }, {})

      Object.keys(evts).reduce((props, key) => {
        props[`on${key.charAt(0).toUpperCase() + key.slice(1)}`] = (
          ...args: any
        ) => {
          evts[key].forEach((evt) => {
            injectProxy(evt, assignObject(context, { arguments: args }))
          })
        }
        return props
      }, field.props)
    }

    next(field)
  }
}

export default hook
