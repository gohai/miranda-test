let ySpeed1 = 0;
let ySpeed2 = 0;
let ySpeed3 = 0;
let ySpeed4 = 0;
let arr = [
  "#DBF3F3",
  "#FFF5EE",
  "#FFE4E1",
  "#B0C4DE",
  "#EEB4B4",
  "#D8BFD8",
  "#E6E6FA",
  "#FFFACD",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //console.log(frameCount);
  background(143, 188, 143);
  drawLine(width / 2 - 100, 0, width / 2 - 100, height - 50 - ySpeed3);
  drawStone(width / 2 - 100, height - 50 - ySpeed3);
  drawCreature(width / 2 - 100, height - ySpeed1);
  ySpeed1++;
  //console.log(ySpeed1);
  if (ySpeed1 > 600) {
    drawCreatureReverse(width / 2 + 100, ySpeed2);
    // push();
    // translate(width/2+50,0);
    // rotate(PI);
    // drawCreature(width/2+50,ySpeed2);
    ySpeed2++;
    // pop();
    if (ySpeed3 > 550) {
      drawLine(width / 2 + 100, ySpeed4 + 50, width / 2 + 100, height);
      drawStone(width / 2 + 100, ySpeed4 + 50);
      ySpeed4++;
    }
  }
}

function drawCreature(x, y) {
  push();
  translate(x, y);
  drawHead(0, -20);
  drawBody(0, 0);
  //circle(0, 0, 5)
  pop();
}
function drawCreatureReverse(x, y) {
  push();
  translate(x, y);
  rotate(PI);
  drawHead(0, -20);
  drawBody(0, 0);
  //circle(0, 0, 5)
  pop();
}

function drawHead(x, y) {
  push();
  translate(x, y);
  stroke(0);
  strokeWeight(2);
  line(0, 0, -10, -20);
  line(0, 0, 10, -20);
  noStroke();
  circle(0, 0, 40);
  pop();
}
function drawBody(x, y) {
  push();
  translate(x, y);
  for (let i = 0; i < 8; i++) {
    let colorVal = arr[i];
    // console.log(colorVal);
    fill(colorVal);
    noStroke();
    circle(0, i * 25, 40);
  }
  stroke(0);
  let m = random(-5, 5);
  for (let i = 0; i < 8; i++) {
    line(-20, i * 25, -30, i * 25 + m);
    line(20, i * 25, 30, i * 25 + m);
  }
  pop();
}
function drawStone(x, y) {
  push();
  translate(x, y);
  // if(frameCount<300){
  noStroke();
  fill("grey");
  circle(0, 0, 8);
  ySpeed3++;
  //}
  pop();
}

function drawLine(x, y, z, e) {
  stroke(255);
  line(x, y, z, e);
}
