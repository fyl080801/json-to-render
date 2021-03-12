import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import './App.css'

export default defineComponent({
  setup() {
    const route = useRoute()

    return () => (
      <div class="fixed inset-0 flex flex-col">
        <header class="relative z-10 flex-none py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 flex items-center space-x-4">
          <div class="flex-auto flex items-center min-w-0 space-x-5">
            <router-link
              to="/"
              class={{
                'text-green-400': route.name === 'Home',
                'hover:text-green-400': true,
              }}
            >
              Home
            </router-link>
            <router-link
              to="/element"
              class={{
                'text-green-400': route.name === 'Element',
                'hover:text-green-400': true,
              }}
            >
              Element
            </router-link>
            <router-link
              to="/tabs"
              class={{
                'text-green-400': route.name === 'Tabs',
                'hover:text-green-400': true,
              }}
            >
              Tabs
            </router-link>
            <router-link
              to="/designer"
              class={{
                'text-green-400': route.name === 'Designer',
                'hover:text-green-400': true,
              }}
            >
              Designer
            </router-link>
          </div>
        </header>
        <main class="flex-1 relative border-t border-gray-200 dark:border-gray-800">
          <router-view />
        </main>
      </div>
    )
  },
})
