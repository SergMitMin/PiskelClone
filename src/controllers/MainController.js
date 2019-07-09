/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-multi-assign */
/* eslint-disable no-plusplus */
/* eslint-disable function-paren-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import getCursorPosition from './CursorPositionController';
import GIF from 'gif.js';
import download from '../../dist/download'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export default class MainController {
  constructor(MainModel, MainView) {
    this.mainModel = MainModel;
    this.appView = MainView;

    // tool-Btns list
    this.animatedGif = document.querySelector('#anima');
    this.penBtn = document.querySelector('#pen');
    this.createFrameBtn = document.querySelector('#createFrameBtn');
    this.eraserBtn = document.querySelector('#eraser');
    this.lineBtn = document.querySelector('#line');
    this.cursorColorBtn = document.querySelector('#cursorColor');
    this.circleBtn = document.querySelector('#circle');
    this.fillRectagnleBtn = document.querySelector('#fill-rectangle');
    this.strokeRectangleBtn = document.querySelector('#stroke-rectangle');
    this.fillCircleBtn = document.querySelector('#fill-circle');
    this.strokeCircleBtn = document.querySelector('#stroke-circle');
    // size buttons
    this.btn32 = document.querySelector('#btn32');
    this.btn64 = document.querySelector('#btn64');
    this.btn128 = document.querySelector('#btn128');
    // fps button
    this.fpsBtn = document.querySelector('#fps-btn');
    // gif btn
    this.gifBtn = document.querySelector('.create-gif');
    this.downloadGifBtn = document.querySelector('.download-gif');
    this.downloadGifBtn.addEventListener('click', () => {
      this.downloadGif();
    })
    // Size listeners
    this.btn32.addEventListener('click', () => {
      canvas.width = 32;
      canvas.height = 32;
      this.mainModel.setSizeModificator(20);
    });
    this.btn64.addEventListener('click', () => {
      canvas.width = 64;
      canvas.height = 64;
      this.mainModel.setSizeModificator(10);
    });
    this.btn128.addEventListener('click', () => {
      canvas.width = 128;
      canvas.height = 128;
      this.mainModel.setSizeModificator(5);
    });
    // fps listener
    this.fpsBtn.addEventListener('change', (e) => {
      e.preventDefault();
      this.mainModel.setFps(this.fpsBtn.value);
    });
    // create-gif listener
    this.gifBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.createGif();
    })
    /* */

    // show coordinates func
    canvas.addEventListener('mousemove', (e) => {
      this.appView.renderCoords(
        Math.floor(getCursorPosition(canvas, e).x / this.getSize()),
        Math.floor(getCursorPosition(canvas, e).y / this.getSize()));
    });
    // list of keypress events
    document.addEventListener('keypress', (event) => {
      if (event.key === 'q') {
        this.mainModel.setState('pen');
        this.pen();
      }

      if (event.key === 'e') {
        this.mainModel.setState('drawLine');
        this.drawLine();
      }
      if (event.key === 'r') {
        this.mainModel.setState('fillRectangle');
        this.fillRectangle();
      }
      if (event.key === 'r') {
        this.mainModel.setState('fillRectangle');
        this.fillRectangle();
      }
      if (event.key === 't') {
        this.mainModel.setState('strokeRectangle');
        this.strokeRectangle();
      }
      if (event.key === 'y') {
        this.mainModel.setState('fillCircle');
        this.fillCircle();
      }
      if (event.key === 'u') {
        this.mainModel.setState('strokeCircle');
        this.strokeCircle();
      }
      if (event.key === 'z') {
        this.mainModel.setState('erase');
        this.erase();
      }
    });

    // Tools listeners list

    // Pen
    this.penBtn.addEventListener('click', () => {
      this.mainModel.setState('pen');
      this.pen();
    });
    // Eraser
    this.eraserBtn.addEventListener('click', () => {
      this.mainModel.setState('erase');
      this.erase();
    });
    // Strait line
    this.lineBtn.addEventListener('click', () => {
      this.mainModel.setState('drawLine');
      this.drawLine();
    });
    // Fill Rectangle
    this.fillRectagnleBtn.addEventListener('click', () => {
      this.mainModel.setState('fillRectangle');
      this.fillRectangle();
    });
    // Stroke Rectangle
    this.strokeRectangleBtn.addEventListener('click', () => {
      this.mainModel.setState('strokeRectangle');
      this.strokeRectangle();
    });
    // Fill Circle
    this.fillCircleBtn.addEventListener('click', () => {
      this.mainModel.setState('fillCircle');
      this.fillCircle();
    });
    // Stroke Circle
    this.strokeCircleBtn.addEventListener('click', () => {
      this.mainModel.setState('strokeCircle');
      this.strokeCircle();
    });
    // Create Frame
    this.createFrameBtn.addEventListener('click', this.createFrame());
    // Color Picker
    this.cursorColorBtn.addEventListener('change', () => {
      this.mainModel.setCursorColor(this.cursorColorBtn.value);
      console.log(this.cursorColorBtn.value);
    });
  }

  // Shortcut for model size getter
  getSize() {
    return this.mainModel.getSizeModificator();
  }

  pen() {
    let isMouseDown = false;
    ctx.beginPath();
    canvas.addEventListener('mousemove', (e) => {
      const color = this.mainModel.getCursorColor();
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      if (this.mainModel.state.currentTool === 'pen') {
        // Listeners for better drawing
        canvas.addEventListener('mousedown', () => {
          if (this.mainModel.state.currentTool === 'pen') {
            isMouseDown = true;
          }
        });
        canvas.addEventListener('mouseup', () => {
          if (this.mainModel.state.currentTool === 'pen') {
            isMouseDown = false;
            ctx.beginPath();
          }
        });
        // draw method
        if (isMouseDown) {
          ctx.lineTo(
            Math.floor(getCursorPosition(canvas, e).x / this.getSize()),
            Math.floor(getCursorPosition(canvas, e).y / this.getSize()));
          ctx.stroke();
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(
            Math.floor(getCursorPosition(canvas, e).x / this.getSize()),
            Math.floor(getCursorPosition(canvas, e).y / this.getSize()));
        }
      } else {
        canvas.removeEventListener('mousemove', this);
        canvas.removeEventListener('mousedown', this);
        canvas.removeEventListener('mouseup', this);
      }
    });
  }

  drawLine() {
    canvas.addEventListener('mousedown', (e) => {
      if (this.mainModel.state.currentTool === 'drawLine') {
        ctx.beginPath();
        ctx.moveTo(
          getCursorPosition(canvas, e).x / this.getSize(),
          getCursorPosition(canvas, e).y / this.getSize());
      }
    });
    canvas.addEventListener('mouseup', (e) => {
      if (this.mainModel.state.currentTool === 'drawLine') {
        const color = this.mainModel.getCursorColor();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineTo(
          getCursorPosition(canvas, e).x / this.getSize(),
          getCursorPosition(canvas, e).y / this.getSize());
        ctx.lineWidth = 1;
        // set line color
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.beginPath();
      }
    });
  }

  erase() {
    canvas.addEventListener('mousemove', (e) => {
      if (this.mainModel.state.currentTool === 'erase') {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.rect(
          getCursorPosition(canvas, e).x / this.getSize(),
          getCursorPosition(canvas, e).y / this.getSize(), 5, 5);
        ctx.fill();
      }
    });
  }

  fillRectangle() {
    let lastMouseX;
    let lastMouseY;
    let mouseDown;
    let mouseX;
    let mouseY;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    mouseDown = false;
    ctx.beginPath();
    // Mousedown
    canvas.addEventListener('mousedown', (e) => {
      if (this.mainModel.state.currentTool === 'fillRectangle') {
        lastMouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        lastMouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        mouseDown = true;
      }
    });
    // MouseUP
    canvas.addEventListener('mouseup', (e) => {
      if (this.mainModel.state.currentTool === 'fillRectangle') {
        mouseDown = false;
        ctx.beginPath();
      }
    });
    // MouseMove
    canvas.addEventListener('mousemove', (e) => {
      if (this.mainModel.state.currentTool === 'fillRectangle') {
        mouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        mouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        if (mouseDown) {
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          const width = mouseX - lastMouseX;
          const height = mouseY - lastMouseY;
          ctx.rect(lastMouseX, lastMouseY, width, height);
          ctx.fillStyle = this.mainModel.getCursorColor();
          ctx.lineWidth = 1;
          ctx.fill();
        }
      }
    });
  }

  strokeRectangle() {
    let lastMouseX;
    let lastMouseY;
    let mouseDown;
    let mouseX;
    let mouseY;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    mouseDown = false;
    ctx.beginPath();
    // Mousedown
    canvas.addEventListener('mousedown', (e) => {
      if (this.mainModel.state.currentTool === 'strokeRectangle') {
        lastMouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        lastMouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        mouseDown = true;
      }
    });
    // MouseUP
    canvas.addEventListener('mouseup', (e) => {
      if (this.mainModel.state.currentTool === 'strokeRectangle') {
        mouseDown = false;
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
      }
    });
    // MouseMove
    canvas.addEventListener('mousemove', (e) => {
      if (this.mainModel.state.currentTool === 'strokeRectangle') {
        mouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        mouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        if (mouseDown) {
          const width = mouseX - lastMouseX;
          const height = mouseY - lastMouseY;
          ctx.rect(lastMouseX, lastMouseY, width, height);
          ctx.strokeStyle = this.mainModel.getCursorColor();
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });
  }

  fillCircle() {
    let lastMouseX;
    let lastMouseY;
    let mouseDown;
    let mouseX;
    let mouseY;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    mouseDown = false;
    ctx.beginPath();
    // Mousedown
    canvas.addEventListener('mousedown', (e) => {
      if (this.mainModel.state.currentTool === 'fillCircle') {
        lastMouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        lastMouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        mouseDown = true;
      }
    });
    // MouseUP
    canvas.addEventListener('mouseup', (e) => {
      if (this.mainModel.state.currentTool === 'fillCircle') {
        mouseDown = false;
        ctx.beginPath();
      }
    });
    // MouseMove
    canvas.addEventListener('mousemove', (e) => {
      if (this.mainModel.state.currentTool === 'fillCircle') {
        mouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        mouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        if (mouseDown) {
          // ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.beginPath();
          // eslint-disable-next-line radix
          const radious = parseInt((mouseX - lastMouseX) - (mouseY - lastMouseY) / 2);
          ctx.arc(lastMouseX, lastMouseY, Math.abs(radious), 0, 2 * Math.PI);
          ctx.fillStyle = this.mainModel.getCursorColor();
          ctx.lineWidth = 1;
          ctx.fill();
        }
      }
    });
  }

  strokeCircle() {
    let lastMouseX;
    let lastMouseY;
    let mouseDown;
    let mouseX;
    let mouseY;
    lastMouseX = lastMouseY = 0;
    mouseX = mouseY = 0;
    mouseDown = false;
    ctx.beginPath();
    // Mousedown
    canvas.addEventListener('mousedown', (e) => {
      if (this.mainModel.state.currentTool === 'strokeCircle') {
        lastMouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        lastMouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        mouseDown = true;
      }
    });
    // MouseUP
    canvas.addEventListener('mouseup', (e) => {
      if (this.mainModel.state.currentTool === 'strokeCircle') {
        mouseDown = false;
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
      }
    });
    // MouseMove
    canvas.addEventListener('mousemove', (e) => {
      if (this.mainModel.state.currentTool === 'strokeCircle') {
        mouseX = Math.floor(getCursorPosition(canvas, e).x / this.getSize());
        mouseY = Math.floor(getCursorPosition(canvas, e).y / this.getSize());
        if (mouseDown) {
          ctx.beginPath();
          // eslint-disable-next-line radix
          const radious = parseInt((mouseX - lastMouseX) - (mouseY - lastMouseY) / 2);
          ctx.arc(lastMouseX, lastMouseY, Math.abs(radious), 0, 2 * Math.PI);
          ctx.strokeStyle = this.mainModel.getCursorColor();
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });
  }

  createFrame() {
    const target = document.getElementById('animation');
    let count = 0;
    const startAnimation = () => {
      clearInterval(animationTimer);
      const frames = this.mainModel.getFrames();
      const singleFrame = frames[count];
      if (count < frames.length) {
        target.innerHTML = `<img src="${singleFrame.src}"></img>`;
        count++;
      } else {
        count = 0;
      }
      animationTimer = setInterval(startAnimation, (1000 / this.mainModel.getFps()));
    };
    let animationTimer = setInterval(startAnimation, (1000 / this.mainModel.getFps()));
    const createBtn = document.querySelector('#createFrameBtn');
    createBtn.addEventListener('mouseup', (e) => {
      e.preventDefault();
      const frame = this.appView.dataToImage(canvas);
      this.appView.render(frame);
      // this.mainModel.localStorage().getBase64Image(canvas);
      this.mainModel.setFrames(frame);
      this.mainModel.getFrames();
    });
  }
  createGif() {
    // eslint - disable - next - line vars - on - top
    // eslint - disable - next - line no -var
    const animationTarget = document.getElementById('anima');
    let gifForDown = animationTarget.attributes[0].nodeValue;
    const frames = this.mainModel.getFrames();
    var gif = new GIF({
      workers: 2,
      quality: 5,
    });

    frames.forEach(e => {
      gif.addFrame(e);
    })
    gif.on('finished', function (blob) {
      let blob1 = URL.createObjectURL(blob);
      // animationTarget.src = URL.createObjectURL(blob);
      // download(`data:image/gif;base64, ${animationTarget}`, "dlDataUrlBin.gif", "image/gif");
      var x = new XMLHttpRequest();
      x.open("GET", `${blob1}`, true);
      x.responseType = 'blob';
      x.onload = function (e) { download(x.response, "dlBinAjax.gif", "image/gif"); }
      x.send();
    });
    gif.render();

    // console.log(animationTarget);
  }
}
