import { assignObject, cloneDeep } from '@json-to-render/utils'

export default (getOptions: Function, update: Function) => {
  const { auto = false, defaultData = [] } = getOptions()

  const instance = {
    data: cloneDeep(defaultData),
    request: async () => {
      const { url, datatype = 'json', props } = getOptions()

      const response: any = await fetch(url, props)

      const result =
        datatype === 'json' ? await response.json() : await response.text()

      instance.data = result

      update(instance)
    }
  }

  if (auto) {
    instance.request()
  }

  update(assignObject(instance))
}
