let openai_api_proxy = "https://zest-quiet-phalange.glitch.me/";

let img_1, drawingLayer, colorPicker, brushSize = 10;
let resultText = "", currentText = "";
let resImg, comfy, workflow;

function preload() {
  img_1 = loadImage("1.jpg");
  workflow = loadJSON("workflow_api.json");
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // Initialize drawing layer
  drawingLayer = createGraphics(600, 400);
  drawingLayer.background(255);

  // Get HTML controls
  colorPicker = select("#colorPicker");
  select("#clearButton").mousePressed(restartCanvas);
  select("#saveButton").mousePressed(saveCanvasImage);

  comfy = new ComfyUiP5Helper("https://gpu1.gohai.xyz:8188");
}

function draw() {
  background(255);
  image(img_1, 0, 0, width, height); // Display background image
  image(drawingLayer, (width - 600) / 2, (height - 400) / 2); // Display drawing layer

  if (mouseIsPressed || touches.length > 0) {
    let x = mouseX || touches[0]?.x;
    let y = mouseY || touches[0]?.y;

    let drawingX = (width - 600) / 2;
    let drawingY = (height - 400) / 2;

    if (x > drawingX && x < drawingX + 600 && y > drawingY && y < drawingY + 400) {
      drawingLayer.strokeWeight(brushSize);
      drawingLayer.stroke(colorPicker.value());
      drawingLayer.line(pmouseX || x, pmouseY || y, x, y);
    }
  }

  fill(0);
  textAlign(CENTER, TOP);
  textSize(16);
  text(currentText, width / 2, 450, 600, 300);

  if (resImg) {
    image(resImg, width / 2 - 300, height - 320, 600, 300);
  }
}

function restartCanvas() {
  drawingLayer.clear();
  drawingLayer.background(255);
  resultText = "";
  currentText = "";
  resImg = null;
}

function saveCanvasImage() {
  saveCanvas(drawingLayer, "coloring", "png");
}

// Example: Add analyzePastLife functionality as needed
