import { defineComponent, watch, ref } from 'vue'
import {
  assignObject,
  proxyContextToken,
  proxyServiceToken,
} from '@json2render/core'
import { getState } from '../store'
import {
  childrenPrerender,
  componentServiceToken,
  // injectPrerender,
  prerenderServiceToken,
  renderServiceToken,
  slotsPrerender,
  slotsToken,
} from '../feature'

export default defineComponent({
  name: 'vJnode',
  props: {
    field: { type: Object, required: true },
    scope: { type: Object, required: true },
  },
  setup: (props) => {
    const container: any = getState()

    const nodeField = ref<any>(assignObject(props.field))
    const prerender = container.resolve(prerenderServiceToken)
    const render = container.resolve(renderServiceToken)
    const proxy = container.resolve(proxyServiceToken)
    const context = container.resolve(proxyContextToken)
    const component = container.resolve(componentServiceToken)
    const injectedContext = assignObject(context, {
      scope: props.scope,
    })
    const slots = container.resolve(slotsToken)

    watch(
      () => props.field,
      (value) => {
        let watchField = assignObject(value)

        prerender.process(
          watchField,
          injectedContext
        )(
          ...[
            childrenPrerender,
            slotsPrerender(slots),
            () => (field: any, next: Function) => {
              watchField = field
              next(watchField)
            },
          ].map((invoke) => ({
            invoke,
          }))
        )

        nodeField.value = proxy.inject(watchField, injectedContext)
      },
      { deep: false, immediate: true }
    )

    return () => {
      const renderField = assignObject(nodeField.value)

      render.process(renderField, injectedContext)()

      const rendered = component.renderNode(renderField, props.scope)

      if (rendered?.ref) {
        const { r, i }: any = rendered.ref
        context.refs[r] = i.refs[r]
      }

      return rendered
    }
  },
})
