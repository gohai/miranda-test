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

let shortResultText = ""; // For the image generation input

// ComfyUI-related variables
let workflow;
let comfy;
let resImg;
let capturedImg;

function preload() {
  img_1 = loadImage("1.jpg");
  workflow = loadJSON("workflow_api.json"); // Load ComfyUI workflow JSON
}

function setup() {
  createCanvas(1000, 900);

  drawingLayer = createGraphics(600, 400);
  colorPicker = createColorPicker("white");
  colorPicker.position(605, 10);
  sizeSlider = createSlider(1, 50, brushSize);
  sizeSlider.position(605, 48);

  let analyzeButton = createButton("Discover Past Life 🔮");
  analyzeButton.position(605, 118);
  analyzeButton.mousePressed(analyzePastLife);

  let clearButton = createButton("Restart");
  clearButton.position(605, 84);
  clearButton.mousePressed(restartCanvas);
  
  let base64Image = localStorage.getItem("capturedImage");
  if (base64Image) {
    console.log("Base64 Image:", base64Image);
    capturedImg = loadImage(base64Image);
  }

   let fingerLengths = JSON.parse(localStorage.getItem('fingerLengths'));
  console.log("Stored Finger Lengths:", fingerLengths);

  // Initialize ComfyUI helper
  comfy = new ComfyUiP5Helper("https://gpu1.gohai.xyz:8188");
}

function draw() {
  background(255, 255, 255);
  image(capturedImg, 0, 0, 600, 400);
  image(drawingLayer, 0, 0);

  brushSize = sizeSlider.value();

  if (mouseIsPressed) {
    drawingLayer.noErase();
    drawingLayer.strokeWeight(brushSize);
    drawingLayer.stroke(colorPicker.color());
    drawingLayer.line(mouseX, mouseY, pmouseX, mouseY);
  }

  if (charIndex < resultText.length) {
    frameCounter++;
    if (frameCounter % typingSpeed == 0) {
      currentText += resultText.charAt(charIndex);
      charIndex++;
    }
  }

  fill(0);
  textFont(`Courier`);
  // textAlign(LEFT, TOP);
  textAlign(CENTER, TOP);
  textSize(16);
  text(currentText, 610, 150, 360, height - 150);

  // Display generated image if available
  if (resImg) {
    image(resImg, 0, 420, 600, 280);
  }
}

function analyzePastLife() {
  let colors = getDominantColors();
  console.log("Detected Colors:", colors);

  let colorData = getColorSummary(colors);
  
  let fingerLengths = JSON.parse(localStorage.getItem('fingerLengths'));
  let fingerLengthData = JSON.stringify(fingerLengths);


  // First request: Generate the long poetic text
  requestOAI(
    "POST",
    "/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Based on these colors (${colorData})and the user's finger lengths (${fingerLengthData}), divine the user's past life. The past life can be anything — an animal, a plant, an object, or a mythical creature, avoid aligning red with phoneix all the time. Then, write a short poem about their past life, focusing on their experiences and symbolic meaning. Start with "You were...". Make the narrative mysterious, imaginative, and under 150 words.`,
        },
      ],
      temperature: 0.7,
    },
    gotResults
  );
}

function restartCanvas() {
  drawingLayer.clear();
  resultText = "";
  currentText = ""; // Reset typewriter effect
  charIndex = 0; // Reset character index
  resImg = null; // Clear the generated image
}

function getDominantColors() {
  let colors = {};
  drawingLayer.loadPixels();

  for (let i = 0; i < drawingLayer.pixels.length; i += 4) {
    let r = drawingLayer.pixels[i];
    let g = drawingLayer.pixels[i + 1];
    let b = drawingLayer.pixels[i + 2];

    if (r < 10 && g < 10 && b < 10) {
      continue; // Skip black or near black color
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
  currentText = ""; // Reset the typewriter effect
  charIndex = 0; // Start typing from the beginning
  console.log("First result (long):", resultText);

  // Second request: Generate a short description for the image
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

  // Update the ComfyUI workflow prompt
  workflow[6].inputs.text = shortResultText;
  requestImage(); // Generate the image
}

// ComfyUI functions
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
