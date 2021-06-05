import { HookInvoker } from '@json2render/core'

export default ({ proxy, context }: any): HookInvoker =>
  (field, next) => {
    if (!field.col) {
      next(field)
      return
    }

    const colProps = field.col

    delete field.col

    next(
      proxy.inject(
        {
          component: 'el-col',
          props: typeof colProps === 'number' ? { span: colProps } : colProps,
          children: [field],
        },
        context
      )
    )
  }
