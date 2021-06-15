// import { get } from 'lodash-es'

import { deepGet } from '@json2render/core'

export default (source: any, path: string) => {
  return deepGet(source, path)
}
