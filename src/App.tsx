import { defineComponent } from 'vue'
import './App.scss'

export default defineComponent({
  setup() {
    return () => (
      <>
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/element">Element</router-link> |
          <router-link to="/tabs">Tabs</router-link>
        </div>
        <router-view />
      </>
    )
  },
})
