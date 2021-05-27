import { FunctionHook } from '@json2render/utils'

const hook: FunctionHook =
  ({ injectProxy, context }) =>
  (field, next) => {
    if (!field.col) {
      next(field)
      return
    }

    const colProps = field.col

    delete field.col

    next(
      injectProxy(
        {
          component: 'el-col',
          props: typeof colProps === 'number' ? { span: colProps } : colProps,
          children: [field],
        },
        context
      )
    )
  }

export default hook
