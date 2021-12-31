import { createServiceProvider, globalServiceProvider, mergeServices } from "./service";
import { isArray, isDom, isFunction, noop } from "./helper";
import { injectProxy, getProxyDefine } from "./proxy";
import { pipeline } from "./pipeline";
import { runInAction, observable, toJS, set, when } from "mobx";

let currentInstance = null;

const getCurrentInstance = () => currentInstance;

const setCurrentInstance = (instance) => {
  currentInstance = instance;
};

const unsetCurrentInstance = () => {
  currentInstance = null;
};

// const useListener = (props, { injector }) => {
//   const watchList = [];
//   when(
//     [() => props.listeners, () => props.modelValue, () => props.dataSource, () => props.fields],
//     () => {
//       watchList.forEach((watcher) => watcher());
//       watchList.length = 0;

//       if (!props.listeners || !isArray(props.listeners)) {
//         return;
//       }

//       nextTick(() => {
//         props.listeners?.forEach((item) => {
//           const injected = injector(deepClone(item));

//           const watcher = isFunction(injected.watch)
//             ? injected.watch
//             : isArray(injected.watch)
//             ? injected.watch.map((sw, index) => (isFunction(sw) ? sw : () => injected.watch[index]))
//             : () => injected.watch;

//           watchList.push(
//             when(
//               watcher,
//               () => {
//                 injected.actions?.forEach((action) => {
//                   if (action.condition === undefined || !!action.condition) {
//                     if (isFunction(action.handler)) {
//                       if (action.timeout) {
//                         setTimeout(() => {
//                           action.handler();
//                         }, action.timeout);
//                       } else {
//                         action.handler();
//                       }
//                     }
//                   }
//                 });
//               },
//               {
//                 deep: injected.deep,
//                 immediate: injected.immediate,
//               },
//             ),
//           );
//         });
//       });
//     },
//     { deep: false, immediate: true },
//   );

//   // onBeforeUnmount(() => {
//   //   watchList.forEach((watcher) => watcher());
//   //   watchList.length = 0;
//   // });
// };

export const render = (props) => {
  const instance = getCurrentInstance();

  if (!instance) {
    return noop;
  }

  const { context, field } = props;

  const { services } = instance;

  const injector = injectProxy({
    context,
    scope: {},
    proxy: services.proxy.map((p) => p({ functional: services.functional })),
  });

  const renderField = observable({
    value: null,
  });

  pipeline(
    ...[
      ...services.beforeBindHandlers.map((item) => item.handler),
      () => (field, next) => {
        runInAction(() => {
          renderField.value = field;
          next(renderField.value);
        });
      },
    ].map((provider) => provider({ context, props, injector })),
  )(toJS(getProxyDefine(field)));

  return services.provider(injector(renderField), { context, injector });
};

export const createRender = (props) => {
  const { fields, dataSource, listeners } = props;

  const serviceProvider = createServiceProvider();

  const context = observable({
    model: {},
  });

  const rootRender = (elm) => {
    const services = mergeServices(
      globalServiceProvider.getServices(),
      serviceProvider.getServices(),
    );

    const instance = {
      services,
    };

    if (!isFunction(services.provider)) {
      return;
    }

    setCurrentInstance(instance);

    const injector = injectProxy({
      context,
      scope: {},
      proxy: services.proxy.map((p) => p({ functional: services.functional })),
    });

    // datasource
    Object.keys(dataSource || {}).forEach((key) => {
      const info = dataSource[key];
      const provider = services.store[info.type || "default"];

      if (["model", "scope", "arguments", "refs"].indexOf(key) < 0 && isFunction(provider)) {
        set(
          context,
          key,
          provider(() => injector(info.props)),
        );
      }
    });

    try {
      const renderRoot =
        typeof elm === "string" ? document.querySelector(elm) : isDom(elm) ? elm : null;

      if (!renderRoot) {
        return;
      }

      if (isArray(fields) && fields.length > 1) {
        fields.forEach((field) => {
          const root = document.createElement("div");

          renderRoot.parentElement?.insertBefore(root, renderRoot);

          render({ field, context })(root);
        });
        renderRoot.remove();
      } else {
        render({ field: isArray(fields) && fields.length > 0 ? fields[0] : fields, context })(
          renderRoot,
        );
      }
    } finally {
      unsetCurrentInstance();
    }
  };

  const root = {
    use(onSetup) {
      onSetup(serviceProvider.getSetting());
      return root;
    },
    render: rootRender,
  };

  return root;
};
