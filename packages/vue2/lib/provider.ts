import Vue from "vue";
import { observer } from "mobx-vue";
import { toJS } from "mobx";
import { render } from "@json2render/core";

export const provider = (field, context) => {
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

        return h(
          field.value.component,
          {
            domProps: toJS(field.value?.domProps),
            props: toJS(field.value?.props),
            class: toJS(field.value?.class),
            style: toJS(field.value?.style),
            on: toJS(field.value?.on),
            nativeOn: toJS(field.value?.nativeOn),
            scopedSlots: {},
          },
          field.value.children?.map((child) => {
            return h(createChildNode(child));
          }),
        );
      },
    }),
  );

  return (elm) => {
    new Vue({
      render: (h) => h(JNode),
    }).$mount(elm);
  };
};
