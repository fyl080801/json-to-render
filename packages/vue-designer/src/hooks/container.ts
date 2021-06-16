import { HookInvoker } from '@json2render/vue'

export default (): HookInvoker => {
  return (field, next) => {
    if (!field.location) {
      next(field)
      return
    }

    const containered = {
      component: 'v-jdesigner-container',
      props: field.location,
      children: [field],
    }

    delete field.location

    next(containered)
  }
}
