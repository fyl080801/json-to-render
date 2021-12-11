<script lang="ts" setup>
import { onMounted, ref } from "@vue/composition-api";
import { useGlobalRender, createRender } from "@json2render/core";
import { vueProvider } from "@json2render/vue2";

useGlobalRender(({ useProvider, onBeforeRender }) => {
  useProvider(vueProvider);

  onBeforeRender(() => (field, next) => {
    field.class = ["j2r"];
    next(field);
  });

  onBeforeRender(({ props }) => {
    let i = null;
    let timer = null;

    return (field, next) => {
      if (field.rel) {
        if (i === null) {
          i = field.rel;
        }

        next({ component: "span", domProps: { innerText: i } });

        timer = setInterval(() => {
          if (i > 0) {
            i--;
            next({ component: "span", domProps: { innerText: i } });
          } else {
            clearInterval(timer);
            next(field);
          }
        }, 1000);
      } else {
        next(field);
      }
    };
  });
});

const render = createRender({
  fields: [
    {
      component: "div",
      children: [
        { component: "p", rel: 5, domProps: { innerText: "aaaaa" } },
        { component: "p", domProps: { innerText: "$:model.text" } },
      ],
    },
    {
      component: "div",
      children: [
        {
          component: "input",
          domProps: { value: "$:model.text" },
          on: { input: "$:(e)=>model.text=e.target.value" },
        },
      ],
    },
  ],
});

const rootRef = ref();

onMounted(() => {
  render.render(rootRef.value);
});
</script>

<template>
  <div ref="rootRef">app</div>
</template>
