import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => (field, next) => {
  if (!field.row) {
    next(field)
    return
  }

  const rowProps = field.row

  delete field.row

  field.children = [
    {
      component: 'el-row',
      props: typeof rowProps === 'number' ? { gutter: rowProps } : rowProps,
      children: field.children,
    },
  ]

  next(field)
}
