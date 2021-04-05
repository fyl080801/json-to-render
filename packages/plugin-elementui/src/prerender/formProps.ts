import { FunctionHook } from '@json2render/utils'

const hook: FunctionHook = ({ injectProxy, context }) => {
  return (field, next) => {
    if (!field.form) {
      next(field)
      return
    }

    const formProps = field.form

    delete field.form

    next(
      injectProxy(
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

export default hook
