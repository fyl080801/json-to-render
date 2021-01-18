import { defineComponent, h, isReactive, reactive, resolveComponent } from 'vue'
import { injectProxy } from '@json-to-render/core'
import { cloneDeep } from '@json-to-render/utils'
import JNode from './jNode'

export default defineComponent({
  name: 'vJrender',
  components: { [JNode.name]: JNode },
  props: {
    modelValue: { type: Object, default: () => ({}) },
    component: { type: String, default: 'div' },
    fields: { type: Array, default: () => [] },
    listeners: { type: Array, default: () => [] }
  },
  emits: ['setup', 'update:modelValue'],
  setup: props => {
    // ctx.emit('setup', {
    //   use: (fn: Function) => {
    //     const builder = {
    //       // 注册组件
    //       component: (name: string, component: any) => {
    //         // 要用一个统一的存储
    //         console.log(name, component)
    //       },
    //       proxy: () => {
    //         //
    //       },
    //       hook: () => {
    //         //
    //       },
    //       functional: () => {
    //         //
    //       }
    //     }

    //     fn(builder)
    //   }
    // })

    const field = reactive(
      injectProxy(
        cloneDeep({ component: props.component, children: props.fields }),
        isReactive(props.modelValue)
          ? props.modelValue
          : reactive(props.modelValue)
      )
    )

    console.log(field)

    return () => {
      return h(resolveComponent(JNode.name), { field })
    }
  }
})
