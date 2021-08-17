import {
  computed,
  defineComponent,
  h,
  isVNode,
  ref,
  watch,
  toRaw,
  resolveDynamicComponent,
  nextTick,
} from 'vue'
import { getState } from '../store'
// import { injectProxy } from './proxy'
import {
  cloneDeep,
  assignArray,
  proxyServiceToken,
  proxyContextToken,
} from '@json2render/core'
import { useJRender } from './mixins'
// import { useRenderStore } from '@/store'
// import { useCustomComponent } from '../DesignElement/mixins'

export default defineComponent({
  name: 'JNode',
  props: { field: Object },
  setup: (props) => {
    // const { getBeforeRenders, getComponent } = useRenderStore()
    const {
      slots,
      components, // 这个render单独注册的组件
      // context,
      beforeRenderHandlers,
    } = useJRender() as any

    const container: any = getState()

    const proxy = container.resolve(proxyServiceToken)
    const context = container.resolve(proxyContextToken)

    const updating = ref(false)

    // const injector = proxy.inject(context)

    const nodeField = ref()

    const nodeChildren = computed(() => {
      const slotChildren = nodeField.value?.children?.reduce(
        (target: any, child: any) => {
          const slotName = child.slot || 'default'
          target[slotName] ||= []

          if (child.component === 'slot') {
            const scoped = (slots[child.name || 'default'] || new Function())(
              child.props || {}
            )
            scoped?.forEach((s: any) => {
              target[slotName].push(s)
            })
          } else {
            target[slotName].push(child)
          }

          return target
        },
        {}
      )

      return slotChildren || {}
    })

    const nodeSlots = computed(() => {
      return Array.from(
        new Set(
          nodeField.value?.children?.map((item: any) => item.slot || 'default')
        )
      )
    })

    // 为了在清空某个组件的slot后，再添加组件重新渲染
    watch(
      () => nodeSlots.value?.length,
      () => {
        updating.value = true
        nextTick(() => {
          updating.value = false
        })
      }
    )

    watch(
      () => ({
        ...props.field,
        title: undefined,
        opened: undefined,
        opens: undefined,
        children: undefined,
      }),
      (value) => {
        const node = { ...cloneDeep(value), children: props.field?.children }

        // assignArray(beforeRenderHandlers, getBeforeRenders()).forEach(
        //   (handler) => {
        //     node = handler(node)
        //   }
        // )

        nodeField.value = proxy.inject(node, context)
      },
      { deep: true, immediate: true }
    )

    return () => {
      if (updating.value) {
        return
      }

      const renderField =
        toRaw(
          components.get(nodeField.value?.component)
          // || getComponent(nodeField.value?.component)
        ) || nodeField.value?.component

      const renderChildren = Object.keys(nodeChildren.value).reduce(
        (target: any, key) => {
          target[key] = () =>
            nodeChildren.value[key].map((item: any) => {
              return typeof item === 'string' || isVNode(item)
                ? item
                : h(resolveDynamicComponent('JNode') as any, {
                    field: item,
                    key: item.nodeId,
                  })
            })
          return target
        },
        {}
      )

      return (
        renderField &&
        h(
          resolveDynamicComponent(renderField) as any,
          nodeField.value.props,
          renderChildren
        )
      )
    }
  },
})
