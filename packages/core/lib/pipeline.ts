export const pipeline = (...funcs) => {
  return (scope) => {
    let currentScope = scope;

    const dispatch = (i) => {
      const next = (nextScope) => {
        currentScope = nextScope;
        return dispatch(i + 1);
      };

      const currentFn = i >= funcs.length ? null : funcs[i];

      if (!currentFn) {
        return Promise.resolve();
      }

      return Promise.resolve(currentFn(currentScope, next));
    };

    return dispatch(0);
  };
};
