import { defineComponent } from 'vue'
import './App.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="fixed inset-0 flex flex-col">
        <header class="relative z-10 flex-none py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 flex items-center space-x-4">
          <div class="flex-auto flex items-center min-w-0 space-x-5">
            <router-link to="/">Home</router-link>
            <router-link to="/element">Element</router-link>
            <router-link to="/tabs">Tabs</router-link>
          </div>
        </header>
        <main class="flex-1 relative border-t border-gray-200 dark:border-gray-800">
          <router-view />
        </main>
      </div>
    )
  },
})
