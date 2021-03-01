import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { editor } from 'monaco-editor'

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

self.MonacoEnvironment = {
  getWorker(workerId, label) {
    if (label === 'json') {
      return new JsonWorker()
    }
    return new EditorWorker()
  },
}

// import loader from '@monaco-editor/loader'

// if (import.meta.env.PROD) {
//   loader.config({ paths: { vs: '/assets/monaco-editor/vs' } })
// }

export default defineComponent({
  name: 'json-editor',
  props: {
    modelValue: { type: String, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const dom = ref()
    let instance: editor.IStandaloneCodeEditor

    onMounted(async () => {
      // const monaco = await loader.init()

      instance = editor.create(dom.value, {
        model: editor.createModel(props.modelValue, 'json'),
        tabSize: 2,
        automaticLayout: true,
        scrollBeyondLastLine: false,
      })

      instance?.onDidChangeModelContent(() => {
        ctx.emit('update:modelValue', instance?.getValue())
      })

      setTimeout(() => {
        instance?.getAction('editor.action.formatDocument').run()
      }, 1000)
    })

    onBeforeUnmount(() => {
      instance?.getModel()?.dispose()
      instance?.dispose()
    })

    watch(
      () => props.modelValue,
      () => {
        instance?.setValue(props.modelValue)

        instance?.getAction('editor.action.formatDocument').run()
      }
    )

    return () => <div class="h-full" ref={dom}></div>
  },
})
