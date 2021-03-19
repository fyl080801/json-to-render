import { defineComponent, reactive, ref } from 'vue'
import Jrender from '@json2render/vue'
import Toolbox from './components/Toolbox'
import PropertyBox from './components/PropertyBox'
import Container from './components/Container'
import './Main.css'

export default defineComponent({
  name: 'vJdesigner',
  components: { Jrender },
  props: { config: { type: Array, required: true } },
  setup() {
    // const { config } = props

    // const reactived = reactive(config)

    const layout = [
      {
        component: 'v-jdesigner-toolbox',
        location: {},
      },
      {
        component: 'v-jdesigner-propertybox',
        location: {},
      },
    ]

    const onSetup = ({ component }: any) => {
      component(Toolbox.name, Toolbox)
      component(PropertyBox.name, PropertyBox)
      component(Container.name, Container)
    }

    // return () => (
    //   <div class="w-full h-full flex flex-col">
    //     <div class="flex-auto flex-grow-0 flex-shrink-0">top</div>
    //     <div class="flex flex-row flex-1">
    //       <div class="flex-auto flex-grow-0 flex-shrink-0">m-left</div>
    //       <div class="flex flex-col flex-1 border border-blue-200">
    //         <div class="flex-auto flex-grow-0 flex-shrink-0">m-top</div>
    //         <div class="flex-1 border border-gray-200">
    //           {/* design */}
    //           middle
    //         </div>
    //         <div class="flex-auto flex-grow-0 flex-shrink-0">m-bottom</div>
    //       </div>
    //       <div class="flex-auto flex-grow-0 flex-shrink-0">m-right</div>
    //     </div>
    //     <div class="flex-auto flex-grow-0 flex-shrink-0">bottom</div>
    //   </div>
    // )
    return () => (
      <jrender
        class="v-jdesigner w-full h-full grid"
        fields={layout}
        onSetup={onSetup}
      ></jrender>
    )
  },
})
