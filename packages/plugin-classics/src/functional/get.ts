// import { get } from 'lodash-es'

import { deepGet } from '@json2render/utils'

export default (source: any, path: string) => {
  return deepGet(source, path)
}
