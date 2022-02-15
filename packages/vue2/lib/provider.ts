import Vue from 'vue'
import { observer } from 'mobx-vue'
import { toJS, computed } from 'mobx'
import { render, getProxyDefine, deepClone } from '@json2render/core'
import { isOriginTag } from './domTags'

export const provider = (field, props) => {
  const { injector, scope } = props

  const createChildNode = (child, s) => {
    const renderChild = render(child, Object.assign({}, scope, s))

    return Vue.component('JChild', {
      mounted() {
        renderChild(this.$el)

        // // 这里 instance 丢失了，先强制给过去
        // const nonInstance = !getCurrentInstance();

        // if (nonInstance) {
        //   setCurrentInstance(instance);
        // }

        // try {
        //   renderChild(this.$el);
        //   // render(child, Object.assign({}, scope, s)).call(this, this.$el);
        // } finally {
        //   if (nonInstance) {
        //     unsetCurrentInstance();
        //   }
        // }
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
              props: toJS(field.value?.props),
              domProps: toJS(field.value?.domProps),
              on: injector(deepClone(getProxyDefine(field.value?.on))),
              nativeOn: injector(deepClone(getProxyDefine(field.value?.nativeOn))),
              class: toJS(field.value?.class),
              style: toJS(field.value?.style),
            },
            field.value.children?.map((child) => {
              return h(createChildNode(child, {}))
            }),
          )
        } else {
          return h(
            field.value.component,
            {
              attrs: toJS(field.value?.attrs),
              props: toJS(field.value?.props),
              domProps: toJS(field.value?.domProps),
              on: injector(deepClone(getProxyDefine(field.value?.on))),
              nativeOn: injector(deepClone(getProxyDefine(field.value?.nativeOn))),
              scopedSlots: (renderSlots.get().scoped as any).reduce((target, item) => {
                target[item.name] = (s) => {
                  return (item.children || []).map((field) => {
                    return h(createChildNode(field, s))
                  })
                }
                return target
              }, {}),
              class: toJS(field.value?.class),
              style: toJS(field.value?.style),
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
