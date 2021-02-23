import { Environment } from 'monaco-editor'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    MonacoEnvironment: Environment
  }
}
