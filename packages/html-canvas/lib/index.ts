import { render } from "@json2render/core";

export const provider = (field, context) => {
  let root = null;
  let canvas = null;

  return (elm) => {
    if (!root || !canvas) {
      root = elm;

      canvas = document.createElement("canvas");

      root.appendChild(canvas);
    }

    // 绘制
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = field.value.fillStyle;
    ctx.fillRect(...field.value.fillRect);

    field.value.children?.forEach((child) => {
      render({ field: child, context })();
    });
  };
};
