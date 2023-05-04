let p;
let a = 0;
let invisibleCanvas = [];
let t = 2;
let co = 0;
let strokeWidth = 0;
let currentColor;


function setup() {
  let cnv = createCanvas(windowWidth,windowHeight);
    cnv.parent("canvasContainer");
  background(240, 255, 255);
  push();
  noStroke();
  fill(255);
  rect(width / 2, height * 0.1, width * 0.4, height * 0.9);
  pop();

  for (let i = 0; i < 3; i++) {
    p = new DrawingBoard(
      width / 2,
      height * 0.1 + height * i * 0.3,
      width * 0.4,
      height * 0.3
    );
    invisibleCanvas.push(p);
  }

  invisibleCanvas[1].toggleCover(true);
  invisibleCanvas[2].toggleCover(true);

}

function draw() {
  background(240, 255, 255);


  button();
  toolBar();
  //display invisble canvas & change thickness
  for (let i = 0; i < 3; i++) {
    invisibleCanvas[i].display();
    if(t == 2){
      strokeWidth = 2;
    }
    if(t == 3){
      strokeWidth = 5;
    }
    if(t == 4){
      strokeWidth = 10;
    }
    if(t == 5){
      strokeWidth = 15;
    }
    if(t == 6){
      strokeWidth = 20;
    }
    invisibleCanvas[i].t = strokeWidth;

    if(co == 1){
      invisibleCanvas[i].c = 0;
    }
    if(co == 2){
      invisibleCanvas[i].c = "#0000FF ";
    }
    if(co == 3){
      invisibleCanvas[i].c = "#FF0000" ;
    }
    if(co == 4){
      invisibleCanvas[i].c = "#059D1C  " ;
    }
    if(co == 5){
      invisibleCanvas[i].c = " #FFFB00 " ;
    }
    if(co == 6){
      invisibleCanvas[i].c = " #773602 " ;
    }
    if(co == 7){
      invisibleCanvas[i].c = "#FF8700  " ;
    }
    if(co == 8){
      invisibleCanvas[i].c = " #C64B99  " ;
    }
   
    currentColor = invisibleCanvas[i].c ;
    if(invisibleCanvas[i].c == " #FFFFFF "){
      currentColor = "#D2D6D3"; 
    }
   //eraser
   if(co == 9){
    invisibleCanvas[i].c = " #FFFFFF " ;
   }

  }
   //allow drawing
   if (mouseIsPressed == true) {
    invisibleCanvas[0].drawLine(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (mouseIsPressed == true && a == 1) {
    invisibleCanvas[1].drawLine(pmouseX, pmouseY, mouseX, mouseY);
  }
  if (mouseIsPressed == true && a == 2) {
    invisibleCanvas[2].drawLine(pmouseX, pmouseY, mouseX, mouseY);
  }


  // tooltip:
  push();
  stroke(currentColor)
  circle(mouseX, mouseY,strokeWidth);
 pop();
  // if statement needs mor detail to target only the drawing area:
  if(mouseX > width/2 && mouseX<width*0.9){
    noCursor();
  }else{
    cursor();
  }

}

class DrawingBoard {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.t = 1;
    this.c = 0;
    this.covered = false;
    this.graphicLayer = createGraphics(w, h);
    // this.objects = []; 
  }
  display() {
    // this.graphicLayer2.clear();
    push();
    translate(this.x, this.y);
    // background
   // fill(40, 40, 230);
    fill(255);
    rect(0, 0, width * 0.4, height * 0.3);
    // draw graphic Layer
    image(this.graphicLayer, 0, 0);

    if(this.covered == true){
      fill(230, 255, 255);
      rect(0, 0, this.w, this.h*0.96);
    }
    pop();
  }
  drawLine(x1, y1, x2, y2) {
    // draw onto this.graphicLayer
    // this.graphicLayer.line(x1, y1, x2, y2);
    // take offset into account:
    this.graphicLayer.strokeWeight(this.t);
    this.graphicLayer.stroke(this.c);
    this.graphicLayer.line(x1 - this.x, y1 - this.y, x2 - this.x, y2 - this.y);
  }
  toggleCover(onOff) {
    //console.log("toggleCover")
    this.covered = onOff;
  }

}

function button() {
   //1
   if(invisibleCanvas[0].covered == false){
  fill(0);
  text("Done", width - 60, height / 2 - 180);
  noFill();
  rect(width - 70, height / 2 - 200, 50, 50);
   }
  //2
  if(invisibleCanvas[1].covered == false){
  fill(0);
  text("Done", width - 60, height / 2 + 40);
  noFill();
  rect(width - 70, height / 2 + 20, 50, 50);
  }
  //3
  if(invisibleCanvas[2].covered == false){
  fill(0);
  text("Done", width - 60, height / 2 + 272);
  noFill();
  rect(width - 70, height / 2 + 240, 50, 50);
  }
  push();
  if(invisibleCanvas[0].covered == false && invisibleCanvas[1].covered == false && invisibleCanvas[2].covered == false){
    fill(240, 255, 255);
    noStroke();
    rect(width-72,height/2-210,55,550);
  }
  pop();
}

function mousePressed(){
  if (
    width - 70 < mouseX &&
    mouseX < width - 20 &&
    height / 2 - 200 < mouseY &&
    mouseY < height / 2 - 150
  ) {
    a = 1;
    invisibleCanvas[1].toggleCover(false);
    invisibleCanvas[0].toggleCover(true);
  }

  if ( width - 70 < mouseX &&
    mouseX < width - 20 &&
    height / 2 + 20 < mouseY &&
    mouseY < height / 2 + 70
  ) {
    a = 2;
    invisibleCanvas[1].toggleCover(true);
    invisibleCanvas[2].toggleCover(false);
  }

  if (
    width - 70 < mouseX &&
    mouseX < width - 20 &&
    height / 2 + 240 < mouseY &&
    mouseY < height / 2 + 290
  ) {
    a = 3;
    // manage covers with drawigboards cover toggle function
    for(let i = 0; i<3;i++){
     invisibleCanvas[i].toggleCover(false);
    }
  }

  if(mouseX<width*0.15+2.5 && mouseX>width*0.15-2.5 && mouseY<height*0.1+82.5 && mouseY>height*0.1+77.5){
    t = 2;
  }

  if(mouseX<width*0.2+5 && mouseX>width*0.2-5 && mouseY<height*0.1+85 && mouseY>height*0.1+75){
    t = 3;
  }

  if(mouseX<width*0.25+7.5 && mouseX>width*0.25-7.5 && mouseY<height*0.1+87.5 && mouseY>height*0.1+72.5){
    t = 4;
  }

  if(mouseX<width*0.3+10 && mouseX>width*0.3-10 && mouseY<height*0.1+90 && mouseY>height*0.1+70){
    t = 5;
  }
  if(mouseX<width*0.35+10 && mouseX>width*0.35-10 && mouseY<height*0.1+92.5 && mouseY>height*0.1+67.5){
    t = 6;
  }
  if(mouseX<width*0.2+10 && mouseX>width*0.2-10 && mouseY<height*0.1+150 && mouseY>height*0.1+130){
    co = 1;
  }
  if(mouseX<width*0.25+10 && mouseX>width*0.25-10 && mouseY<height*0.1+150 && mouseY>height*0.1+130){
    co = 2;
  }
  if(mouseX<width*0.3+10 && mouseX>width*0.3-10 && mouseY<height*0.1+150 && mouseY>height*0.1+130){
    co = 3;
  }
  if(mouseX<width*0.35+10 && mouseX>width*0.35-10 && mouseY<height*0.1+150 && mouseY>height*0.1+130){
    co = 4;
  }
  if(mouseX<width*0.15+10 && mouseX>width*0.15-10 && mouseY<height*0.1+190 && mouseY>height*0.1+170){
    co = 5;
  }
  if(mouseX<width*0.2+10 && mouseX>width*0.2-10 && mouseY<height*0.1+190 && mouseY>height*0.1+170){
    co = 6;
  }
  if(mouseX<width*0.25+10 && mouseX>width*0.25-10 && mouseY<height*0.1+190 && mouseY>height*0.1+170){
    co = 7;
  }
  if(mouseX<width*0.3+10 && mouseX>width*0.3-10 && mouseY<height*0.1+190 && mouseY>height*0.1+170){
    co = 8;
  }
  if(mouseX>width*0.1+20 && mouseX<width*0.4-20 && mouseY<height*0.1+580 && mouseY>height*0.1+540){
    co = 9;
  }
}

function toolBar() {
  let tx = width * 0.1;
  let ty = height * 0.1;
  let tw = width * 0.3;
  let th = height * 0.8;
  //tool bar
  noFill();
  rect(tx, ty, tw, th);
  //pen
  rect(tx + 20, ty + 60, tw - 40, 40);
  //thisckness
  fill(0);
  circle(tx * 1.5, ty + 80, 5);
  circle(tx * 2, ty + 80, 10);
  circle(tx * 2.5, ty + 80, 15);
  circle(tx * 3, ty + 80, 20);
  circle(tx * 3.5, ty + 80, 25);

  noFill();
  //color
  rect(tx + 20, ty + 120, tw - 40, 80);
  push();
  noStroke();
  fill("black");
  circle(tx*2, ty + 140, 20);
  fill("blue");
  circle(tx*2.5, ty + 140, 20);
  fill("red");
  circle(tx*3, ty + 140, 20);
  fill("green");
  circle(tx*3.5, ty + 140, 20);
  fill("yellow");
  circle(tx*1.5, ty + 180, 20);
  fill("brown");
  circle(tx*2, ty + 180, 20);
  fill("orange");
  circle(tx*2.5, ty + 180, 20);
  fill("purple");
  circle(tx *3, ty + 180, 20);
  pop();
  //sticker
  rect(tx + 20, ty + 220, tw - 40, 320);
  //eraser
  rect(tx + 20, ty + 560, tw - 40, 40);
  push();
  textSize(24);
  fill(220);
  text("ERASER",tx*2 , ty + 585);
  pop();
}

