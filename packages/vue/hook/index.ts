import pipeline from '@jrender/core/utils/pipeline'
import { condition, jsonSchema, text } from '@jrender/hook-base/index'
// import { FunctionHook } from '@jrender/types/index'

// const createServiceCollection = (): any => {
//   const map = new Map()

//   const instance = {
//     provider: (name: string, deps: Array<any>) => {
//       const factory = deps[deps.length - 1]
//       const dependOns = deps.slice(0, deps.length - 1)
//       map.set(name, { dependOns, factory })
//       return instance
//     },
//     build: () => {
//       map.forEach((value, key) => {})
//     }
//   }
// }

// const service = createServiceCollection()
//   .provider('store', [
//     () => {
//       return () => new Map()
//     }
//   ])
//   .provider('registry', [
//     'store',
//     (store: Map) => {
//       return {
//         set() {

//         }
//       }
//     }
//   ])
//   .provider('renderHook', [
//     'store',
//     'registry',
//     (store: Map, registry: any) => {
//       return () => {
//         return {
//           set: hook => {
//             registry.set()
//           }
//         }
//       }
//     }
//   ])
// .provider('fieldProxy', [
//   'store',
//   store => {
//     return () => {
//       //
//     }
//   }
// ])

// const renderHookProvider = service().get('renderHook')()

// renderHookProvider.set(text).withIndex(1)
// renderHookProvider.set(slotHook).withIndex(1024)

// .service.add('fieldProxy', {})

export const createSetupHooks = (funcs: Array<FunctionHook>) => {
  return pipeline([jsonSchema, text, ...funcs])
}

export const createRenderHooks = (funcs: Array<FunctionHook>) => {
  return pipeline([condition, ...funcs])
}