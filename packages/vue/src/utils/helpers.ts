import { isArray } from 'lodash-es'

export const forEachTarget = (target: any, iteratee: any) => {
  if (isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      iteratee(target[i], i, target)
    }
  } else if (typeof target === 'object' && target !== undefined) {
    for (const key in target) {
      iteratee(target[key], key, target)
    }
  }
}
