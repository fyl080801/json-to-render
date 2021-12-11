import { createServiceProvider, globalServiceProvider, mergeServices } from "./service";
import { isArray, isDom, isFunction } from "./helper";
import { injectProxy, getProxyDefine } from "./proxy";
import { pipeline } from "./pipeline";
import { runInAction, observable, toJS } from "mobx";

let currentInstance = null;

const getCurrentInstance = () => currentInstance;

const setCurrentInstance = (instance) => {
  currentInstance = instance;
};

const unsetCurrentInstance = () => {
  currentInstance = null;
};

export const render = (props) => {
  const { services, context } = getCurrentInstance();

  const injector = injectProxy({
    context,
    scope: {},
    proxy: services.proxy.map((p) => p({ functional: services.functional })),
  });

  const renderField = observable({
    field: null,
  });

  pipeline(
    ...[
      ...services.beforeRenderHandlers.map((item) => item.handler),
      () => (fieldScope, next) => {
        runInAction(() => {
          renderField.field = fieldScope;
          next(renderField);
        });
      },
      // ...services.renderHandlers.map((item) => item.handler),
      // () => (field, next) => {
      //   renderField = field;
      //   next(renderField);
      // },
    ].map((provider) => provider({ context, props })),
  )(toJS(getProxyDefine(props.field)));

  return services.provider(injector(observable(renderField)));
};

export const createRender = (props) => {
  const { fields } = props;

  const serviceProvider = createServiceProvider();

  const services = mergeServices(
    globalServiceProvider.getServices(),
    serviceProvider.getServices(),
  );

  const context = observable({
    model: {},
  });

  const instance = {
    services,
    context,
  };

  const rootRender = (elm) => {
    if (!isFunction(services.provider)) {
      return;
    }

    setCurrentInstance(instance);

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

          render({ field })(root);
        });
        renderRoot.remove();
      } else {
        render({ field: isArray(fields) && fields.length > 0 ? fields[0] : fields })(renderRoot);
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
