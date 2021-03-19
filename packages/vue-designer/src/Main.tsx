import { defineComponent, reactive, ref } from 'vue'
import Jrender from '@json2render/vue'
import Toolbox from './components/Toolbox'
import PropertyBox from './components/PropertyBox'
import Container from './components/Container'
import Designer from './components/Designer'
import './Main.css'

import containerHook from './hooks/container'

export default defineComponent({
  name: 'vJdesigner',
  components: { Jrender },
  props: { config: { type: Array, required: true } },
  setup() {
    // const { config } = props

    // const reactived = reactive(config)

    const layout = [
      {
        component: 'toolbox',
        location: {
          type: 'dock',
        },
      },
      {
        component: 'propertybox',
        location: {
          type: 'dock',
        },
      },
      {
        component: 'designer',
      },
    ]

    const onSetup = ({ component, prerender }: any) => {
      component('toolbox', Toolbox)
      component('propertybox', PropertyBox)
      component(Container.name, Container)
      component('designer', Designer)

      prerender(containerHook)
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
