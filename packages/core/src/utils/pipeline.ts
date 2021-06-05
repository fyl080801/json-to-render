import { HookMeta, FunctionNext, FunctionPipeLine } from '../types'

const pipeline: FunctionPipeLine = (hooks, services) => {
  return (scope: any) => {
    // 全局索引
    let index = -1
    let currentScope = scope

    // 索引遍历的递归委托，返回当前索引函数执行的 Promise 对象
    const dispatch = (i: number) => {
      // 全局索引比当前索引大，说明已经执行过一次方法了，全局索引已经被加 1
      if (index >= i) return Promise.reject(new Error('next 执行了多次'))

      // 更新全局索引
      index = i

      // 下个方法委托，返回索引遍历的递归委托执行结果
      const next: FunctionNext = (nextScope: any) => {
        currentScope = nextScope
        // 执行时索引加 1
        return dispatch(i + 1)
      }

      // 方法执行当前索引是否超过函数数组索引
      // 如果超过了则当前函数是空
      // 否则指针移到当前索引位置，得到当前需要执行的函数
      const current: HookMeta | null = i >= hooks.length ? null : hooks[i]

      // 当前函数是空的，说明最后一个索引的函数已经执行完毕
      if (!current) {
        return Promise.resolve()
      }

      // 返回一个 Promise 对象，任务是执行当前指针处的函数
      // 将上下文对象和返回下个方法的委托函数作为参数传递进去
      return Promise.resolve(current.invoke(services)(currentScope, next))
    }

    // 传递索引 0 开始执行索引遍历递归委托
    return dispatch(0)
  }
}

export default pipeline
