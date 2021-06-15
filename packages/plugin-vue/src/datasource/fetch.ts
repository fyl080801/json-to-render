import { cloneDeep } from '@json2render/core'
import { reactive } from 'vue'

export default (options: any) => {
  const { props } = options

  const instance = reactive({
    data: cloneDeep(options.defaultData || []),
    loading: false,
    request: async () => {
      instance.loading = true

      try {
        const response: any = await fetch(options.url, props)

        const result =
          !props.dataType || props.dataType === 'json'
            ? await response.json()
            : await response.text()

        instance.data = result
      } finally {
        instance.loading = false
      }
    },
  })

  if (options.auto) {
    instance.request()
  }

  return instance
}
