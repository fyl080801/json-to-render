import { cloneDeep } from '@json2render/utils'
import { reactive } from 'vue'

export default (props: any) => {
  // const { auto = false, defaultData = [] } = props

  const instance = reactive({
    data: cloneDeep(props.defaultData || []),
    loading: false,
    request: async () => {
      instance.loading = true

      try {
        const response: any = await fetch(props.url, props)

        const result =
          props.dataType === 'json'
            ? await response.json()
            : await response.text()

        instance.data = result
      } finally {
        instance.loading = false
      }
    },
  })

  if (props.auto) {
    instance.request()
  }

  return instance
}
