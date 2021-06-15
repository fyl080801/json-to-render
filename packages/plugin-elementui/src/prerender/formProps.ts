import { HookInvoker } from '@json2render/vue'

export default ({ proxy, context }: any): HookInvoker => {
  return (field, next) => {
    if (!field.form) {
      next(field)
      return
    }

    const formProps = field.form

    delete field.form

    next(
      proxy.inject(
        {
          component: 'el-form-item',
          props:
            typeof formProps === 'string' ? { label: formProps } : formProps,
          children: [field],
        },
        context
      )
    )
  }
}
