import Vue from "vue";
import { observer } from "mobx-vue";
import { toJS } from "mobx";
import { render } from "@json2render/core";

export const vueProvider = (renderField) => {
  const createChildNode = (child) => {
    return Vue.component("JChild", {
      mounted() {
        render({ field: child })(this.$el);
      },
      render(h) {
        return h("div");
      },
    });
  };

  const JNode = observer(
    Vue.component("JNode", {
      render(h) {
        return h(
          renderField.field?.component,
          {
            domProps: toJS(renderField.field?.domProps),
            props: toJS(renderField.field?.props),
            class: toJS(renderField.field?.class),
            style: toJS(renderField.field?.style),
            on: toJS(renderField.field?.on),
            nativeOn: toJS(renderField.field?.nativeOn),
            scopedSlots: {},
          },
          renderField.field?.children?.map((child) => {
            return h(createChildNode(child));
          }),
        );
      },
      updated() {
        //
      },
      mounted() {
        //
      },
      destroyed() {
        //
      },
    }),
  );

  return (elm) => {
    new Vue({
      render: (h) => h(JNode),
    }).$mount(elm);
  };
};
