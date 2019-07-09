/* eslint-disable quotes */
/* eslint-disable class-methods-use-this */
/* eslint-disable padded-blocks */
/* eslint-disable no-unused-vars */

export default class MainView {
  constructor(preview) {
    this.preview = preview;
    this.frameTarget = document.querySelector('#frames');
    this.coordinatesTarget = document.querySelector('#canvas-coordinates');
    this.gifTarget = document.querySelector('.images');
  }

  dataToImage(canvas) {
    const dataUrl = canvas.toDataURL();
    const imageFoo = document.createElement('img');
    imageFoo.src = dataUrl;
    imageFoo.style.width = '100px';
    imageFoo.style.height = '100px';
    return imageFoo;
  }

  render(imageFoo) {
    const frame = document.createElement('div');
    frame.style.border = '1px solid black';
    frame.style.marginBottom = '5px';
    frame.classList.add('frame');
    frame.appendChild(imageFoo);
    this.frameTarget.appendChild(frame);
  }

  renderCoords(dataX, dataY) {
    // const coordinates = document.querySelector('#canvas-coordinates');
    // coordinates.classList.add('canvas-coordinates');
    this.coordinatesTarget.innerHTML = `<p>x:${dataX} y:${dataY}</p>`;
    // document.querySelector('.canvas-controls').appendChild(coordinates);

  }

  // renderGif(gif) {
  //   this.gifTarget.appendChild(gif);
  //   gif.render();
  //   console.log(gif);
  // }
}
