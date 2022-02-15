import { createApp, defineComponent, h } from 'vue'
import Observer, { Plugin } from 'mobx-vue-lite'
import { computed, toJS } from 'mobx'
import { deepClone, render, getProxyDefine } from '@json2render/core'

export const provider = (field, props) => {
  const { scope } = props

  const createChildNode = (child, s) => {
    console.log(child)
    const renderChild = render(child, Object.assign({}, scope, s))

    return defineComponent({
      mounted() {
        renderChild.call(this, this.$el)
      },
      render() {
        return h('div')
      },
    })
  }

  const childrenSlots = computed(() => {
    if (!field.value) {
      return null
    }

    const result =
      field.value?.children?.reduce((target, child) => {
        const slotName = child?.slot || 'default'
        target[slotName] ||= []
        target[slotName].push(child)
        return target
      }, {}) || {}

    return Object.keys(result).length
      ? Object.keys(result).reduce((target, key) => {
          target[key] = (s) => {
            return result[key].map((child) => {
              return h(createChildNode(child, s))
            })
          }

          return target
        }, {})
      : null
  })

  const JNode = defineComponent({
    setup() {
      return () => {
        if (
          !field.value ||
          !field.value.component ||
          (field.value.if !== undefined && !field.value.if)
        ) {
          return
        }

        return h(field.value.component, { ...field.value?.props }, childrenSlots.get())
      }
    },
  })

  let app

  return function (elm) {
    const app = createApp(JNode)
    // app.use(Observer as any)
    app.mount(elm)
  }
}
