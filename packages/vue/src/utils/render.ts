import { resolveComponent, h } from 'vue'

const render = (children: any[]) => {
  return children.map(child => h(resolveComponent('vJnode'), { field: child }))
}

export default (children: any) => {
  if (!children) {
    return null
  }

  return Array.isArray(children)
    ? render(children)
    : Object.keys(children).reduce((pre: any, cur: any) => {
        pre[cur] = () => {
          return render(children[cur])
        }
        return pre
      }, {})
}
