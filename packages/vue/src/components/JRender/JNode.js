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
import { injectProxy } from './proxy'
import { deepClone, assignArray } from '@/utils/helpers'
import { useJRender } from './mixins'
import { useRenderStore } from '@/store'
import { useCustomComponent } from '../DesignElement/mixins'

export default defineComponent({
  name: 'JNode',
  props: { field: Object },
  setup: (props) => {
    const { getBeforeRenders, getComponent } = useRenderStore()
    const {
      slots,
      components, // 这个render单独注册的组件
      context,
      beforeRenderHandlers,
    } = useJRender()

    const customFields = useCustomComponent()

    const customFieldIds = computed(() => {
      return customFields.map((item) => item.nodeId)
    })

    const updating = ref(false)

    const injector = injectProxy(context)

    const nodeField = ref()

    const nodeChildren = computed(() => {
      const slotChildren = nodeField.value?.children?.reduce(
        (target, child) => {
          const slotName = child.slot || 'default'
          target[slotName] ||= []

          if (
            child.component === 'slot' &&
            customFieldIds.value.includes(child.nodeId)
          ) {
            const scoped = (slots[child.name || 'default'] || new Function())(
              child.props || {}
            )
            scoped?.forEach((s) => {
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
          nodeField.value?.children?.map((item) => item.slot || 'default')
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
        let node = { ...deepClone(value), children: props.field.children }

        assignArray(beforeRenderHandlers, getBeforeRenders()).forEach(
          (handler) => {
            node = handler(node)
          }
        )

        nodeField.value = injector(node)
      },
      { deep: true, immediate: true }
    )

    return () => {
      if (updating.value) {
        return
      }

      const renderField =
        toRaw(
          components.get(nodeField.value?.component) ||
            getComponent(nodeField.value?.component)
        ) || nodeField.value?.component

      const renderChildren = Object.keys(nodeChildren.value).reduce(
        (target, key) => {
          target[key] = () =>
            nodeChildren.value[key].map((item) => {
              return typeof item === 'string' || isVNode(item)
                ? item
                : h(resolveDynamicComponent('JNode'), {
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
          resolveDynamicComponent(renderField),
          nodeField.value.props,
          renderChildren
        )
      )
    }
  },
})
