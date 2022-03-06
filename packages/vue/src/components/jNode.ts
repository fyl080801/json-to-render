import { defineComponent, watch, ref,nextTick } from 'vue'
import {
  assignObject,
  proxyContextToken,
  proxyServiceToken,
} from '@json2render/core'
import { getState } from '../store'
import {
  childrenPrerender,
  componentServiceToken,
  injectPrerender,
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

    const nodeField = ref<any>({})
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
        prerender.process(
          proxy.inject(value, injectedContext),
          injectedContext
        )(
          ...[
            childrenPrerender,
            slotsPrerender(slots),
            injectPrerender(nodeField),
          ].map((invoke) => ({ invoke }))
        )
      },
      { deep: false, immediate: true }
    )

    return () => {
      let renderField = assignObject(nodeField.value)

      render.process(
        renderField,
        injectedContext
      )({
        invoke: () => (field: any, next: any) => {
          renderField = field
          next(renderField)
        },
      })

      const rendered = component.renderNode(renderField, props.scope)

      if (rendered?.ref) {
        nextTick(()=>{
          const { r, i }: any = rendered.ref
          context.refs[r] = i.refs[r]
        })
      }

      return rendered
    }
  },
})
