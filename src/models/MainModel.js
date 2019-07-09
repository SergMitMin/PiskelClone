/* eslint-disable prefer-const */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
export default class MainModel {
  constructor(database, state) {
    this.database = database;
    this.state = {
      currentTool: '',
    };
    this.cursorColor = '';
    this.sizeModificator = 5;
    this.fps = 10;
    // eslint-disable-next-line no-array-constructor
    this.framesArray = [];
    this.blob = '';
  }
  setBlob(blob) {
    this.blob = blob;
  }
  getBlob() {
    return this.blob;
  }
  setFps(fps) {
    this.fps = fps;
  }

  getFps() {
    return this.fps;
  }

  setFrames(frame) {
    this.framesArray.push(frame);
  }

  getFrames() {
    return this.framesArray;
  }

  getFramesLength() {
    return this.framesArray.length;
  }

  setState(state) {
    this.state.currentTool = state;
  }

  getState(state) {
    console.log(this.state.currentTool);
    return this.state.currentTool;
  }

  setCursorColor(color) {
    this.cursorColor = color;
  }

  getCursorColor() {
    return this.cursorColor;
  }

  setSizeModificator(size) {
    this.sizeModificator = size;
  }

  getSizeModificator() {
    return this.sizeModificator;
  }

  localStorage(frame, canvas) {
    // still doesnt work
    let getBase64Image = (img) => {
      // eslint-disable-next-line no-shadow
      let canvas = document.createElement('canvas');
      canvas.width = 120;
      canvas.height = 120;

      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let dataURL = canvas.toDataURL('image/png');

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
    };
    let bannerImage = frame;
    let imgData = getBase64Image(bannerImage);
    localStorage.setItem('imgData', imgData);
    localStorage.setItem('canvas', canvas.toDataURL());
    this.canvas = localStorage.getItem(canvas);
  }

  init() {
    let dataImage = localStorage.getItem('imgData');
    let framesList = document.getElementById('frames');
    let img = document.createElement('img');
    img.src = `data:image/png;base64,${dataImage}`;
    framesList.appendChild(img);
    console.log(img);
  }
}
