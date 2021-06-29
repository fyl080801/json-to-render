import { HookInvoker } from '@json2render/vue'
import { deepGet, deepSet } from '@json2render/core'

export default ({ context }: any): HookInvoker =>
  (field, next) => {
    if (field.component !== 'el-checkbox-group' || !field.model) {
      next(field)
      return
    }

    if (deepGet(context, field.model) === undefined) {
      deepSet(context, field.model, [])
    }

    next(field)
  }
