import Vue from 'vue'
import { observer } from 'mobx-vue'
import { computed } from 'mobx'
import { render, deepClone, getProxyDefine } from '@json2render/core'
import { isOriginTag } from './domTags'

export const provider = (field, props) => {
  const { scope } = props

  const createChildNode = (child, s) => {
    const renderChild = render(getProxyDefine(child), Object.assign({}, scope, s))

    return Vue.component('JChild', {
      mounted() {
        renderChild.call(this, this.$el)
      },
      render(h) {
        return h('div')
      },
    })
  }

  const isDom = computed(() => {
    return isOriginTag(field.value?.component)
  })

  const renderSlots = computed(() => {
    if (!field.value) {
      return { scoped: {}, named: {} }
    }

    const { scoped, named } = field.value?.children
      ?.filter((child) => child)
      .reduce(
        ({ scoped, named }, child) => {
          if (child.scopedSlot) {
            scoped[child.scopedSlot] = [...(scoped[child.scopedSlot] || []), child]
          } else {
            const slotName = child?.slot || 'default'
            named[slotName] = [...(named[slotName] || []), child]
          }
          return { scoped, named }
        },
        { scoped: {}, named: {} },
      ) || { scoped: {}, named: {} }

    return {
      scoped: Object.keys(scoped).map((key) => ({ name: key, children: scoped[key] })),
      named: Object.keys(named).map((key) => ({ name: key, children: named[key] })),
    }
  })

  const JNode = observer(
    Vue.component('JNode', {
      render(h) {
        if (
          !field.value ||
          !field.value.component ||
          (field.value.if !== undefined && !field.value.if)
        ) {
          return
        }

        if (isDom.get()) {
          return h(
            field.value.component,
            {
              props: field.value?.props,
              domProps: deepClone(field.value?.domProps),
              on: deepClone(field.value?.on),
              nativeOn: deepClone(field.value?.nativeOn),
              class: deepClone(field.value?.class),
              style: deepClone(field.value?.style),
            },
            field.value.children?.map((child) => {
              return h(createChildNode(child, {}))
            }),
          )
        } else {
          return h(
            field.value.component,
            {
              attrs: deepClone(field.value?.attrs),
              props: field.value?.props,
              domProps: deepClone(field.value?.domProps),
              on: deepClone(field.value?.on),
              nativeOn: deepClone(field.value?.nativeOn),
              scopedSlots: (renderSlots.get().scoped as any).reduce((target, item) => {
                target[item.name] = (s) => {
                  return (item.children || []).map((field) => {
                    return h(createChildNode(field, s))
                  })
                }
                return target
              }, {}),
              class: deepClone(field.value?.class),
              style: deepClone(field.value?.style),
            },
            (renderSlots.get().named as any).reduce((target, item) => {
              item.children.forEach((field) => {
                target.push(h(createChildNode(field, {}), { slot: item.name }))
              })
              return target
            }, []),
          )
        }
      },
    }),
  )

  return function (elm) {
    new Vue({
      parent: this,
      render(h) {
        return h(JNode)
      },
    }).$mount(elm)
  }
}
