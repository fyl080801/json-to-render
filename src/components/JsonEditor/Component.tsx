import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as monaco from 'monaco-editor'
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

export default defineComponent({
  name: 'json-editor',
  props: {
    modelValue: { type: String, required: true },
  },
  emits: ['change', 'update:modelValue'],
  setup(props, ctx) {
    const dom = ref()
    let instance: monaco.editor.IStandaloneCodeEditor

    onMounted(() => {
      const jsonModel = monaco.editor.createModel(
        props.modelValue,
        'json',
        monaco.Uri.parse('json://grid/settings.json')
      )

      instance = monaco.editor.create(dom.value, {
        model: jsonModel,
        tabSize: 2,
        automaticLayout: true,
        scrollBeyondLastLine: false,
      })

      instance?.onDidChangeModelContent(() => {
        const value = instance?.getValue()
        ctx.emit('change', value)
        ctx.emit('update:modelValue', value)
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
