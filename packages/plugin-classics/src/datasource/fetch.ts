import { cloneDeep } from '@json-to-render/utils'
import { reactive } from 'vue'

export default ({ define }: any) => {
  const { auto = false, defaultData = [] } = define()

  const instance = reactive({
    data: cloneDeep(defaultData),
    loading: false,
    request: async () => {
      const { url, dataType = 'json', props } = define()

      instance.loading = true
      try {
        const response: any = await fetch(url, props)

        const result =
          dataType === 'json' ? await response.json() : await response.text()

        instance.data = result
      } finally {
        instance.loading = false
      }
    }
  })

  if (auto) {
    instance.request()
  }

  return instance
}
