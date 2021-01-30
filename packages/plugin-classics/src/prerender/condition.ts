import { assignObject, isArray } from '@json-to-render/utils'
import { getProxyDefine } from '@json-to-render/core'

const hook: FunctionHook = ({ injectProxy }) => (field, next) => {
  const fieldDefine = getProxyDefine(field)

  if (!fieldDefine.children || !isArray(fieldDefine.children)) {
    next(field)
    return
  }

  // field.children = fieldDefine.children.map((child: any) => {
  //   const childDefine = getProxyDefine(child)

  //   if (childDefine.condition !== undefined) {
  //     const assigned = assignObject(childDefine)
  //     delete assigned.condition

  //     const xxx = injectProxy({
  //       $type: 'condition',
  //       $condition: getProxyDefine(childDefine.condition),
  //       $result: assigned
  //     })
  //     debugger
  //     return xxx
  //   }
  //   return childDefine
  // })

  next(field)
}

export default hook
