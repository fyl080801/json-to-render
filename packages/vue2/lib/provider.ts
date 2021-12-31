import Vue from "vue";
import { observer } from "mobx-vue";
import { toJS, computed } from "mobx";
import { render, getProxyDefine, deepClone } from "@json2render/core";
import { isOriginTag } from "./domTags";

export const provider = (field, { context, injector }) => {
  const createChildNode = (child) => {
    return Vue.component("JChild", {
      mounted() {
        render({ field: child, context })(this.$el);
      },
      render(h) {
        return h("div");
      },
    });
  };

  const isDom = computed(() => {
    return isOriginTag(field.value?.component);
  });

  const renderSlots = computed(() => {
    if (!field.value) {
      return { scoped: {}, named: {} };
    }

    const { scoped, named } = field.value?.children
      ?.filter((child) => child)
      .reduce(
        ({ scoped, named }, child) => {
          if (child.scopedSlot) {
            scoped[child.scopedSlot] = [...(scoped[child.scopedSlot] || []), child];
          } else {
            const slotName = child?.slot || "default";
            named[slotName] = [...(named[slotName] || []), child];
          }
          return { scoped, named };
        },
        { scoped: {}, named: {} },
      ) || { scoped: {}, named: {} };

    return {
      scoped: Object.keys(scoped).map((key) => ({ name: key, children: scoped[key] })),
      named: Object.keys(named).map((key) => ({ name: key, children: named[key] })),
    };
  });

  const JNode = observer(
    Vue.component("JNode", {
      render(h) {
        if (
          !field.value ||
          !field.value.component ||
          (field.value.if !== undefined && !field.value.if)
        ) {
          return;
        }

        if (isDom.get()) {
          return h(
            field.value.component,
            {
              domProps: toJS(field.value?.domProps),
              props: toJS(field.value?.props),
              class: toJS(field.value?.class),
              style: toJS(field.value?.style),
              on: injector(deepClone(getProxyDefine(field.value?.on))),
              nativeOn: injector(deepClone(getProxyDefine(field.value?.nativeOn))),
            },
            field.value.children?.map((child) => {
              return h(createChildNode(child));
            }),
          );
        } else {
          return h(
            field.value.component,
            {
              domProps: toJS(field.value?.domProps),
              props: toJS(field.value?.props),
              class: toJS(field.value?.class),
              style: toJS(field.value?.style),
              on: injector(deepClone(getProxyDefine(field.value?.on))),
              nativeOn: injector(deepClone(getProxyDefine(field.value?.nativeOn))),
              scopedSlots: (renderSlots.get().scoped as any).reduce((target, item) => {
                target[item.name] = (s) => {
                  return (item.children || []).map((field) => {
                    return h(createChildNode(field));
                  });
                };
                return target;
              }, {}),
            },
            (renderSlots.get().named as any).reduce((target, item) => {
              item.children.forEach((field) => {
                target.push(h(createChildNode(field), { slot: item.name }));
              });
              return target;
            }, []),
          );
        }
      },
    }),
  );

  return (elm) => {
    new Vue({
      render: (h) => h(JNode),
    }).$mount(elm);
  };
};
