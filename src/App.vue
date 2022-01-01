<script lang="ts" setup>
import { onMounted, ref } from "@vue/composition-api";
import { useGlobalRender, createRender } from "@json2render/core";
import { provider } from "@json2render/vue2";
// import * as canvas from "@json2render/html-canvas";

useGlobalRender(({ useProvider, onBeforeBind }) => {
  useProvider(provider);

  onBeforeBind(() => (field, next) => {
    field.class = ["j2r"];

    next(field);
  });

  onBeforeBind(() => {
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
  dataSource: {
    testdata: {
      props: {
        xxx: "azaz",
      },
    },
    tabledata: {
      props: [
        {
          title: "xxx",
          remark: "xxxxxxx",
        },
        {
          title: "yyy",
          remark: "yyyyyy",
        },
      ],
    },
  },
  fields: [
    {
      component: "div",
      children: [
        { component: "p", rel: 5, domProps: { innerText: "aaaaa" } },
        { component: "p", domProps: { innerText: "$:testdata.xxx" } },
        {
          component: "p",
          if: "$:model.text.length!==5",
          domProps: { innerText: "$:model.text" },
        },
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
        {
          component: "el-input",
          props: { value: "$:model.text" },
          style: { width: "auto" },
          on: { input: "$:(e)=>model.text=e" },
          children: [
            { component: "span", slot: "append", domProps: { innerText: "$:model.text" } },
          ],
        },
      ],
    },
    {
      component: "el-table",
      props: {
        data: "$:tabledata",
      },
      children: [
        { component: "el-table-column", props: { label: "title", prop: "title" } },
        { component: "el-table-column", props: { label: "remark", prop: "remark" } },
        {
          component: "el-table-column",
          props: { label: "operator" },
          children: [
            {
              component: "el-button",
              scopedSlot: "default",
              props: { type: "text" },
              domProps: { innerText: "$:row.title" },
              on: {
                click: "$:()=>alert(row.title)",
              },
            },
          ],
        },
      ],
    },
  ],
});

// const render2 = createRender({
//   fields: {
//     component: "block",
//     fillStyle: "#FF0000",
//     fillRect: [0, 0, 80, 100],
//     children: [
//       {
//         component: "block",
//         fillStyle: "blue",
//         fillRect: [70, 20, 80, 100],
//       },
//     ],
//   },
// }).use(({ useProvider }) => {
//   useProvider(canvas.provider);
// });

const rootRef = ref();

// const canvasRef = ref();

onMounted(() => {
  render.render(rootRef.value);

  // render2.render(canvasRef.value);
});
</script>

<template>
  <div>
    <div ref="rootRef"></div>
    <!-- <div ref="canvasRef"></div> -->
  </div>
</template>
