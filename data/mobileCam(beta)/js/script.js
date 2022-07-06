const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;

const VIDEO_SIZE = 112;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");

const canvasshot = document.getElementById("shot");
const ctxshot = canvasshot.getContext("2d");
video = document.getElementById('video');

let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;

// Load our model.
const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./js/onnx_model.onnx");

// MGU
hidden = new Tensor(new Float32Array(512), "float32")

// Add 'Draw a number here!' to the canvas.
ctx.lineWidth = 28;
ctx.lineJoin = "round";
ctx.font = "28px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillStyle = "#212121";
ctx.fillText("Loading...", CANVAS_SIZE / 2, CANVAS_SIZE / 2);

// Set the line color for the canvas.
ctx.strokeStyle = "#212121";

function clearCanvas() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  for (let i = 0; i < 10; i++) {
    const element = document.getElementById(`prediction-${i}`);
    element.className = "prediction-col";
    element.children[0].children[0].style.height = "0";
  }
}

function drawLine(fromX, fromY, toX, toY) {
  // Draws a line from (fromX, fromY) to (toX, toY).
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.closePath();
  ctx.stroke();
  updatePredictions();
}

async function updatePredictions() {

    // Get the predictions for the canvas data.
    const imgData = ctxshot.getImageData(0, 0, VIDEO_SIZE, VIDEO_SIZE);
    const input = new onnx.Tensor(new Float32Array(imgData.data), "float32");
    const [outputMap1, outputMap2] = await sess.run([input, hidden]);
    const outputTensor = outputMap1[1]//.values().next().value;
    const predictions = outputTensor.data;
    const maxPrediction = Math.max(...predictions);

    for (let i = 0; i < predictions.length; i++) {
        const element = document.getElementById(`prediction-${i}`);
        element.children[0].children[0].style.height = `${predictions[i] * 100}%`;
        element.className =
            predictions[i] === maxPrediction
            ? "prediction-col top-prediction"
            : "prediction-col";
    }
    hidden = outputMap2[1]
//    console.log(new Float32Array(imgData.data));
//    console.log(new Float32Array(imgData.data).slice(0, 10).length);
}

function canvasMouseDown(event) {
  isMouseDown = true;
  if (hasIntroText) {
    clearCanvas();
    hasIntroText = false;
  }
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;

  // To draw a dot on the mouse down event, we set laxtX and lastY to be
  // slightly offset from x and y, and then we call `canvasMouseMove(event)`,
  // which draws a line from (laxtX, lastY) to (x, y) that shows up as a
  // dot because the difference between those points is so small. However,
  // if the points were the same, nothing would be drawn, which is why the
  // 0.001 offset is added.
  lastX = x + 0.001;
  lastY = y + 0.001;
  canvasMouseMove(event);
}

function canvasMouseMove(event) {
  const x = event.offsetX / CANVAS_SCALE;
  const y = event.offsetY / CANVAS_SCALE;
  if (isMouseDown) {
    drawLine(lastX, lastY, x, y);
  }
  lastX = x;
  lastY = y;
}

function bodyMouseUp() {
  isMouseDown = false;
}

function bodyMouseOut(event) {
  // We won't be able to detect a MouseUp event if the mouse has moved
  // ouside the window, so when the mouse leaves the window, we set
  // `isMouseDown` to false automatically. This prevents lines from
  // continuing to be drawn when the mouse returns to the canvas after
  // having been released outside the window.
  if (!event.relatedTarget || event.relatedTarget.nodeName === "HTML") {
    isMouseDown = false;
  }
}

loadingModelPromise.then(() => {
  canvas.addEventListener("mousedown", canvasMouseDown);
  canvas.addEventListener("mousemove", canvasMouseMove);
  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButton.addEventListener("mousedown", clearCanvas);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw a number here!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
})