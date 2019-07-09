/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */

const getCursorPosition = (canvas, e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.round((e.clientX - rect.left));
  const y = Math.round((e.clientY - rect.top));
  return {
    x: x,
    y: y,
  };
};
export default getCursorPosition;
