export const isArray = (target: any) => {
  return (
    target !== undefined &&
    target !== null &&
    Object.prototype.toString.call(target) === '[object Array]'
  )
}

export const isObject = (target: any) => {
  return target !== undefined && typeof target === 'object' && target !== null
}

export const isFunction = (target: any) => {
  return target !== undefined && typeof target === 'function'
}

export const assignArray = (...targets: Array<Array<any>>) => {
  return targets.reduce((pre: Array<any>, cur: Array<any>) => {
    return pre.concat(cur)
  }, [])
}

export const assignObject = (...targets: any) => {
  return Object.assign({}, ...targets)
}

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

const isNumberLike = (value: any) => {
  return String(value).match(/^\d+$/)
}

const toPath = (
  pathString: string | Array<string | number>
): Array<string | number> => {
  if (isArray(pathString)) {
    return pathString as Array<string | number>
  }
  if (typeof pathString === 'number') {
    return [pathString] as Array<string | number>
  }
  pathString = String(pathString)

  // lodash 的实现 - https://github.com/lodash/lodash
  const pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g
  const pathArray: Array<string | number> = []

  const replacer: any = (match: any, num: any, quote: any, str: any) => {
    pathArray.push(quote ? str : num !== undefined ? Number(num) : match)
    return pathArray[pathArray.length - 1]
  }

  pathString.replace(pathRx, replacer)

  return pathArray
}

const hasOwnProperty = (target: any, prop: any) => {
  return Object.prototype.hasOwnProperty.call(target, prop)
}

export const deepSet = (target: any, path: any, value: any) => {
  const fields = isArray(path) ? path : toPath(path)
  const prop = fields.shift()

  if (!fields.length) {
    return (target[prop] = value)
  }

  if (!hasOwnProperty(target, prop) || target[prop] === null) {
    // 当前下标是数字则认定是数组
    const objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {}
    target[prop] = objVal
  }

  deepSet(target[prop], fields, value)
}

export const deepGet = (target: any, path: string | Array<string | number>) => {
  const fields = isArray(path) ? (path as Array<string | number>) : toPath(path)

  if (!fields.length) {
    return target
  }

  let prop = fields.shift()
  let result = target

  while (prop) {
    result = result[prop]
    prop = fields.shift()
  }

  return result
}

export const cloneDeep = (item: any) => {
  if (!item) {
    return item
  } // null, undefined values check

  const types = [Number, String, Boolean]
  let result: any

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach((type) => {
    if (item instanceof type) {
      result = type(item)
    }
  })

  if (typeof result == 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = []
      item.forEach((child: any, index: any) => {
        result[index] = cloneDeep(child)
      })
    } else if (typeof item == 'object') {
      // testing that this is DOM
      if (item.nodeType && typeof item.cloneNode == 'function') {
        result = item.cloneNode(true)
      } else if (!item.prototype) {
        // check that this is a literal
        if (item instanceof Date) {
          result = new Date(item)
        } else {
          // it is an object literal
          result = {}
          for (const i in item) {
            result[i] = cloneDeep(item[i])
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor()
        } else {
          result = item
        }
      }
    } else {
      result = item
    }
  }

  return result
}
