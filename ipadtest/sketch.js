let openai_api_proxy = "https://zest-quiet-phalange.glitch.me/";

let img_1;
let drawingLayer;
let colorPicker;
let brushSize = 10;
let sizeSlider;

let resultText = "";
let currentText = "";
let charIndex = 0;
let typingSpeed = 5;
let frameCounter = 0;

let shortResultText = ""; // 用于生成图片的简短描述

// ComfyUI相关变量
let workflow;
let comfy;
let resImg;

function preload() {
  img_1 = loadImage("1.jpg"); // 加载背景图片
  workflow = loadJSON("workflow_api.json"); // 加载 ComfyUI 工作流
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  drawingLayer = createGraphics(600, 400);
  drawingLayer.background(255);

  // colorPicker = createColorPicker("#000000");
  colorPicker = select("#colorPicker");
  colorPicker.position(20, height - 70);

  sizeSlider = createSlider(1, 50, brushSize);
  sizeSlider.position(150, height - 70);

  let clearButton = createButton("Clear");
  clearButton.position(300, height - 70);
  clearButton.mousePressed(restartCanvas);

  let saveButton = createButton("Save Screenshot");
  saveButton.position(380, height - 70);
  saveButton.mousePressed(saveCanvasImage);

  let analyzeButton = createButton("Discover Past Life 🔮");
  analyzeButton.position(500, height - 70);
  analyzeButton.mousePressed(analyzePastLife);

  select("#clearButton").mousePressed(restartCanvas);
  select("#saveButton").mousePressed(saveCanvasImage);
  // 初始化 ComfyUI 辅助类
  comfy = new ComfyUiP5Helper("https://gpu1.gohai.xyz:8188");
}

function draw() {
  background(255);
  image(img_1, 0, 0, width, height); // 背景图片
  image(drawingLayer, 20, 20); // 绘画层

  brushSize = sizeSlider.value();

  // 绘制模式
  if (mouseIsPressed || touches.length > 0) {
    let x = mouseX || touches[0]?.x;
    let y = mouseY || touches[0]?.y;

    if (x > 20 && x < 620 && y > 20 && y < 420) {
      drawingLayer.noErase();
      drawingLayer.strokeWeight(brushSize);
      drawingLayer.stroke(colorPicker.value());
      drawingLayer.line(pmouseX || x, pmouseY || y, x, y);
    }
  }

  // 打字机效果显示生成结果
  if (charIndex < resultText.length) {
    frameCounter++;
    if (frameCounter % typingSpeed == 0) {
      currentText += resultText.charAt(charIndex);
      charIndex++;
    }
  }

  fill(0);
  textAlign(CENTER, TOP);
  textSize(16);
  text(currentText, width / 2, 450, 600, 300); // 显示文本

  // 显示生成的图片
  if (resImg) {
    image(resImg, width / 2 - 300, height - 320, 600, 300);
  }
}

function analyzePastLife() {
  let colors = getDominantColors();
  console.log("Detected Colors:", colors);

  let colorData = getColorSummary(colors);

  // 请求GPT生成占卜文本
  requestOAI(
    "POST",
    "/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Based on these colors (${colorData}), divine the user's past life. The past life can be anything — an animal, a plant, an object, or a mythical creature, avoid aligning red with phoenix all the time. Then, write a short poem about their past life, focusing on their experiences and symbolic meaning. Start with "You were...". Make the narrative mysterious, imaginative, and under 150 words.`,
        },
      ],
      temperature: 0.7,
    },
    gotResults
  );
}

function restartCanvas() {
  drawingLayer.clear();
  drawingLayer.background(255);
  resultText = "";
  currentText = "";
  charIndex = 0;
  resImg = null;
}

function saveCanvasImage() {
  saveCanvas(drawingLayer, "coloring", "png"); // 保存绘画层
}

// 获取画布上的主要颜色
function getDominantColors() {
  let colors = {};
  drawingLayer.loadPixels();

  for (let i = 0; i < drawingLayer.pixels.length; i += 4) {
    let r = drawingLayer.pixels[i];
    let g = drawingLayer.pixels[i + 1];
    let b = drawingLayer.pixels[i + 2];

    if (r < 10 && g < 10 && b < 10) {
      continue; // 跳过黑色或接近黑色的像素
    }

    let key = r + "," + g + "," + b;
    if (!colors[key]) {
      colors[key] = 0;
    }
    colors[key]++;
  }

  return colors;
}

function getColorSummary(colors) {
  let colorList = Object.keys(colors).map((color) => {
    let [r, g, b] = color.split(",");
    return `rgb(${r}, ${g}, ${b})`;
  });
  return colorList.join(", ");
}

function gotResults(results) {
  resultText = results.choices[0].message.content;
  currentText = "";
  charIndex = 0;
  console.log("First result (long):", resultText);

  // 简化描述供生成图片使用
  requestOAI(
    "POST",
    "/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Summarize this text in 10-20 words for a visual depiction: "${resultText}"`,
        },
      ],
      temperature: 0.7,
    },
    gotShortResult
  );
}

function gotShortResult(results) {
  shortResultText = results.choices[0].message.content;
  console.log("Shortened result (for image generation):", shortResultText);

  workflow[6].inputs.text = shortResultText;
  requestImage();
}

// 请求生成图片
function requestImage() {
  comfy.run(workflow, gotImage);
}

function gotImage(data, err) {
  if (err) {
    console.error("Error generating image:", err);
    return;
  }
  console.log("Image generated:", data);
  if (data.length > 0) {
    resImg = loadImage(data[0].src);
  }
}

function touchMoved() {
  if (touches.length > 0) {
    let x = touches[0].x;
    let y = touches[0].y;
    if (x > 20 && x < 620 && y > 20 && y < 420) {
      drawingLayer.strokeWeight(brushSize);
      drawingLayer.stroke(colorPicker.value());
      drawingLayer.line(pmouseX || x, pmouseY || y, x, y);
    }
  }
  return false; // 防止默认浏览器行为
}
