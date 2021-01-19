import { addProxy } from './proxy'
import { addSetup, addRender } from './hooks'

export const use = (builder: any) => {
  builder({
    proxy: addProxy,
    setup: addSetup,
    render: addRender
  })
}
