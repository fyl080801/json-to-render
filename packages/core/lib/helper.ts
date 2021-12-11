export const isArray = (target) => {
  return Array.isArray(target);
};

export const isObject = (target) => {
  return (
    target !== undefined &&
    target !== null &&
    typeof target === "object" &&
    Object.prototype.toString.call(target) === "[object Object]" &&
    !isArray(target)
  );
};

export const isFunction = (target) => {
  return typeof target === "function";
};

export const isNumberLike = (value) => {
  return String(value).match(/^\d+$/);
};

export const isPromise = (target) => {
  return (
    !!target &&
    (typeof target === "object" || typeof target === "function") &&
    (isFunction(target.then) || isFunction(target.catch))
  );
};

export const isDom = (target) => {
  const expr =
    typeof HTMLElement === "object"
      ? function () {
          return target instanceof HTMLElement;
        }
      : function () {
          return (
            target &&
            typeof target === "object" &&
            target.nodeType === 1 &&
            typeof target.nodeName === "string"
          );
        };

  return expr();
};

export const assignArray = (...targets) => {
  return targets.reduce((pre, cur) => {
    return pre.concat(cur);
  }, []);
};

export const assignObject = (...targets) => {
  return Object.assign({}, ...targets);
};

export const deepClone = (target) => {
  if (!target) {
    return target;
  } // null, undefined values check

  const types = [Number, String, Boolean];
  let result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach((type) => {
    if (target instanceof type) {
      result = type(target);
    }
  });

  if (typeof result == "undefined") {
    if (isArray(target)) {
      result = [];
      target.forEach((child, index) => {
        result[index] = deepClone(child);
      });
    } else if (isObject(target)) {
      // testing that this is DOM
      if (target.nodeType && isFunction(target.cloneNode)) {
        result = target.cloneNode(true);
      } else if (!target.prototype) {
        // check that this is a literal
        if (target instanceof Date) {
          result = new Date(target);
        } else {
          // it is an object literal
          result = {};
          for (const i in target) {
            result[i] = deepClone(target[i]);
          }
        }
      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (target.constructor) {
          // would not advice to do that, reason? Read below
          result = new target.constructor();
        } else {
          result = target;
        }
      }
    } else {
      result = target;
    }
  }

  return result;
};

export const toPath = (pathString) => {
  if (isArray(pathString)) {
    return pathString;
  }
  if (typeof pathString === "number") {
    return [pathString];
  }
  pathString = String(pathString);

  // lodash 的实现 - https://github.com/lodash/lodash
  const pathRx =
    /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  const pathArray = [];

  const replacer = (match, num, quote, str) => {
    pathArray.push(quote ? str : num !== undefined ? Number(num) : match);
    return pathArray[pathArray.length - 1];
  };

  pathString.replace(pathRx, replacer);

  return pathArray;
};

export const hasOwnProperty = (target, prop) => {
  return Object.prototype.hasOwnProperty.call(target, prop);
};

export const deepSet = (target, path, value) => {
  const fields = isArray(path) ? path : toPath(path);
  const prop = fields.shift();

  if (!fields.length) {
    return (target[prop] = value);
  }

  if (!hasOwnProperty(target, prop) || target[prop] === null) {
    // 当前下标是数字则认定是数组
    const objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {};
    target[prop] = objVal;
  }

  deepSet(target[prop], fields, value);
};

export const deepGet = (target, path) => {
  const fields = isArray(path) ? path : toPath(path);

  if (!fields.length) {
    return target;
  }

  let prop = fields.shift();
  let result = target;

  while (prop) {
    result = result[prop];

    if (fields.length > 0 && (result === undefined || result === null)) {
      result = isNumberLike(prop) ? [] : {};
    }

    prop = fields.shift();
  }

  return result;
};

export const cleanObject = (input) => {
  return Object.keys(input).reduce((target, key) => {
    if (target[key] === undefined) {
      delete target[key];
    }
    return target;
  }, input);
};

export const uuid = (len, radix?) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = [];
  let i;

  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
};
