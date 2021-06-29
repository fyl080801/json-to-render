import { HookInvoker } from '@json2render/vue'
import { deepGet, deepSet } from '@json2render/core'

const elements: Record<string, unknown> = {
  'el-checkbox-group': [],
  'el-select': [],
}

export default ({ context }: any): HookInvoker =>
  (field, next) => {
    if (elements[field.component] === undefined || !field.model) {
      next(field)
      return
    }

    if (deepGet(context, field.model) === undefined) {
      deepSet(context, field.model, elements[field.component])
    }

    next(field)
  }
