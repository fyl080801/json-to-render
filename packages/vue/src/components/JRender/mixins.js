import { provide, inject } from 'vue'

const serviceToken = Symbol('serviceToken')

export const useJRender = (props) => {
  if (props) {
    // const context = {
    //   model: isReactive(props.model) ? props.model : reactive(props.model),
    // }

    const services = Object.keys(props).reduce((target, key) => {
      target[key] = props[key]
      return target
    }, {})

    provide(serviceToken, services)

    return services
  } else {
    return inject(serviceToken)
  }
}

// export const useJNode = (props) => {
//   const node = reactive({
//     field: { ...(props.field || {}) },
//     children: [...(props.field?.children || [])],
//   })

//   watch(
//     () => props.field,
//     (value) => {
//       node.field = { ...(value || {}) }
//       node.children = [...(value?.children || [])]
//     }
//   )

//   return node
// }
