import { assignObject } from "./helper";
import { isArray, isDom, isFunction, isObject } from "./helper";
import { observable, runInAction, toJS } from "mobx";

const PROXY = "__j_proxy";
const RAW = "__j_raw";

export const isInjectedProxy = (target) => {
  return target !== undefined && target !== null && target[PROXY];
};

export const getProxyDefine = (target) => {
  return isInjectedProxy(target) ? target[RAW] : target;
};

export const injectProxy = ({ context, scope, proxy }) => {
  const handlers = [...proxy];

  const inject = (input) => {
    if (!isObject(input) && !isArray(input)) {
      return input;
    }

    if (isInjectedProxy(input)) {
      return input;
    }

    return new Proxy(input, {
      get: (target, p) => {
        if (p === PROXY) {
          return true;
        }

        if (p === RAW) {
          return input;
        }

        const value = target[p];

        for (const f of handlers) {
          const handler = f(value);

          if (handler && isFunction(handler)) {
            const result = inject(getProxyDefine(handler(assignObject(context, scope || {}))));

            if (isFunction(result)) {
              return (...args) => runInAction(() => result(...args));
            } else {
              return result;
            }
          }
        }

        return (isDom(value) && value) || inject(getProxyDefine(value));
      },
    });
  };

  return inject;
};
