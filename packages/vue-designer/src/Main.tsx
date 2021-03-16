import { defineComponent, reactive, ref } from 'vue'
import Jrender from '@json2render/vue'
import Toolbox from './components/Toolbox'
import Container from './components/Container'
import './Main.scss'

export default defineComponent({
  name: 'vJdesigner',
  components: { Jrender },
  props: { config: { type: Object, required: true } },
  setup(props) {
    const { config } = props

    const reactived = reactive(config)

    const model = ref({})

    const onSetup = ({ component }: any) => {
      component(Toolbox.name, Toolbox)
      component(Container.name, Container)
    }

    return () => (
      <div class="w-full h-full flex flex-col custom">
        {/* 上 */}
        <div class="flex-auto flex-grow-0 flex-shrink-0"></div>
        {/* 中 */}
        <div class="flex flex-row flex-1">
          {/* 左 */}
          <div class="flex-auto flex-grow-0 flex-shrink-0"></div>
          {/* 中 */}
          <div class="flex flex-col flex-1">
            <div class="flex-auto flex-grow-0 flex-shrink-0"></div>
            <div class="flex-1">{/* design */}</div>
            <div class="flex-auto flex-grow-0 flex-shrink-0"></div>
          </div>
          {/* 右 */}
          <div class="flex-auto flex-grow-0 flex-shrink-0"></div>
        </div>
        {/* 下 */}
        <div class="flex-auto flex-grow-0 flex-shrink-0"></div>
      </div>
    )
  },
})
