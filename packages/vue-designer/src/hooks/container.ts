import { FunctionHook } from '@json2render/utils'

const hook: FunctionHook = () => {
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

export default hook
