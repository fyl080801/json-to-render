// import { deepGet, hasOwnProperty, isArray, isNumberLike, toPath } from "./helper";
// import { set, reactive, ref } from "@vue/composition-api";

const computeMatch = /^\$:/g;

export const compute =
  ({ functional }) =>
  (value) => {
    const handler = (context) => {
      try {
        const keys = Object.keys(context);
        const funcKeys = Object.keys(functional);
        return new Function(...[...keys, ...funcKeys], `return ${value.replace(computeMatch, "")}`)(
          ...[...keys.map((key) => context[key]), ...funcKeys.map((key) => functional[key])],
        );
      } catch {
        //
      }
    };

    return typeof value === "string" && computeMatch.test(value) && handler;
  };

// export const SET = (target, path: string, value: unknown) => {
//   const fields = isArray(path) ? path : toPath(path);
//   const prop = fields.shift();

//   if (!fields.length) {
//     return set(target, prop, value);
//   }

//   if (!hasOwnProperty(target, prop) || target[prop] === undefined) {
//     const objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {};
//     set(target, prop, objVal);
//   }

//   SET(target[prop], fields, value);
// };

// export const GET = (target: Record<string, unknown>, path: string, def: unknown) => {
//   const origin = deepGet(target, path);

//   if (origin === undefined || origin === null) {
//     SET(target, path, def !== undefined && def !== null ? def : null);
//   }

//   return origin !== undefined ? origin : def;
// };

// export const rawData = (options) => {
//   const data = options() || {};
//   return reactive(data !== undefined && data !== null ? data : {});
// };

// export const REF = (target) => {
//   return ref(target);
// };
