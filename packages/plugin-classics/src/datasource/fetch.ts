import { assignObject, cloneDeep } from '@json-to-render/utils'

export default ({ define, set }: any) => {
  const { auto = false, defaultData = [] } = define()

  const instance = {
    data: cloneDeep(defaultData),
    request: async () => {
      const { url, dataType = 'json', props } = define()

      const response: any = await fetch(url, props)

      const result =
        dataType === 'json' ? await response.json() : await response.text()

      instance.data = result

      set(assignObject(instance))
    }
  }

  if (auto) {
    instance.request()
  }

  set(instance)
}
