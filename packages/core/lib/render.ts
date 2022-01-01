import { createServiceProvider, globalServiceProvider, mergeServices } from "./service";
import { isArray, isDom, isFunction, noop } from "./helper";
import { injectProxy, getProxyDefine } from "./proxy";
import { pipeline } from "./pipeline";
import { runInAction, observable, toJS, set } from "mobx";

let currentInstance = null;

export const getCurrentInstance = () => currentInstance;

export const setCurrentInstance = (instance) => {
  currentInstance = instance;
};

export const unsetCurrentInstance = () => {
  currentInstance = null;
};

export const render = (input, scope?) => {
  const instance = getCurrentInstance();

  if (!instance) {
    return noop;
  }

  const origin = toJS(getProxyDefine(input));

  const { services, context } = instance;

  const injector = injectProxy({
    context,
    scope: scope || {},
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
    ].map((provider) => provider({ context, field: origin, scope: scope || {}, injector })),
  )(origin);

  return services.provider(injector(renderField), { context, scope, injector });
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
      context,
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

          render(field)(root);
        });
        renderRoot.remove();
      } else {
        render(isArray(fields) && fields.length > 0 ? fields[0] : fields)(renderRoot);
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
