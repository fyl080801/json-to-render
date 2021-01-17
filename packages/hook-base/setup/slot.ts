import { isArray } from '@jrender/core/utils/helpers'

const hook: FunctionHook = (field, next) => {
  if (!isArray(field.children)) {
    next(field)
    return
  }

  const children = field.children?.filter((child: any) => child) ?? []

  if (children.length <= 0) {
    next(field)
    return
  }

  field.children = children.reduce((pre: any, cur: any) => {
    const currentSlot = cur.slot || 'default'
    pre[currentSlot] = pre[currentSlot] || []
    pre[currentSlot].push(cur)
    return pre
  }, {})

  next(field)
}

export default hook