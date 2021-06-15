import { resolveComponent } from 'vue'
import { isOriginTag } from '@json2render/core'

export const resolveChildren = (children: any[]) => {
  return children
    ? children.reduce((pre: any, cur: any) => {
        const currentSlot = cur.slot || 'default'
        pre[currentSlot] = pre[currentSlot] || []
        pre[currentSlot].push(cur)
        return pre
      }, {})
    : null
}

export const resolveRenderComponent = (name: string) => {
  return isOriginTag(name) ? name : resolveComponent(name)
}
