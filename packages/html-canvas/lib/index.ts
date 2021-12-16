import { render } from "@json2render/core";

export const provider = (field, context) => {
  return (elm) => {
    let canvas;

    if (elm.tagName.toLowerCase() === "canvas") {
      canvas = elm;
    } else {
      canvas = document.createElement("canvas");
      elm.appendChild(canvas);
    }

    // 绘制
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = field.value.fillStyle;
    ctx.fillRect(...field.value.fillRect);

    field.value.children?.forEach((child) => {
      render({ field: child, context })(canvas);
    });
  };
};
