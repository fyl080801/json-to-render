import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'v-jdesigner-container',
  props: {
    type: { type: String, default: 'dock' }, // dock, float
    position: { type: String }, // left, right, top, bottom
    side: { type: String }, // outer, inner
  },
  setup(props, ctx) {
    const reactived: any = reactive({})

    // 这里实现标题栏和布局设置
    return () => (
      <div>
        <div>header</div>
        {ctx.slots.default && ctx.slots.default()}
      </div>
    )
  },
})
