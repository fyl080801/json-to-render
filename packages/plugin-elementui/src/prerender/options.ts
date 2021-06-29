import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => (field, next) => {
  if (!field.options || !field.options.component || !field.options.items) {
    next(field)
    return
  }

  const options = field.options

  delete field.options

  const labelProp = options.labelProp || 'label'
  const valueProp = options.valueProp || 'value'
  const textProp = options.textProp || 'text'

  field.children = options.items.map((item: any) => ({
    component: options.component,
    props: {
      label: item[labelProp],
      value: item[valueProp],
    },
    children: item[textProp]
      ? [{ component: 'span', props: { innerText: item[textProp] } }]
      : undefined,
  }))

  next(field)
}
