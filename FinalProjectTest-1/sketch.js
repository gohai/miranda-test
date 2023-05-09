let p;
let a = 0;
let invisibleCanvas = [];
let PN = 5;
let t = 2;
let co = 0;
let strokeWidth = 0;
let currentColor;
let guidance = true;
let pa = false;
let fire = false;
let sinw = false;
let cosw = false;
let line = true;
let Image1;
let Image2;
let Image3;
let Image4;

function preload(){
  Image1 = loadImage("assets/particle.png");
  Image2 = loadImage("assets/fireworks.png");
  Image3 = loadImage("assets/sinewaves.png");
  Image4 = loadImage("assets/cosinewaves.png");
  
}
function setup() {
createCanvas(windowWidth,windowHeight);

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
     //allow drawing
     if (mouseIsPressed == true && a == 0) {
      if(pa == true ){
        //console.log("ready!!");
        let particleX = mouseX - invisibleCanvas[0].x;
        let particleY = mouseY - invisibleCanvas[0].y;
        invisibleCanvas[0].objects.push( new Particle(particleX, particleY, invisibleCanvas[0].graphicLayer2 ));
      }else if(fire == true ){
        let particleX = mouseX - invisibleCanvas[0].x;
        let particleY = mouseY - invisibleCanvas[0].y;
        for(let i = 0; i<PN ; i++){ 
        invisibleCanvas[0].objects.push( new Fireworks(particleX, particleY, invisibleCanvas[0].graphicLayer ));
        }
      }else if(line == true){
          invisibleCanvas[0].drawLine(pmouseX, pmouseY, mouseX, mouseY);
      }else if(sinw == true ){
        let particleX = mouseX - invisibleCanvas[0].x;
        let particleY = mouseY - invisibleCanvas[0].y;
        invisibleCanvas[0].objects.push( new SineWave(particleX, particleY, invisibleCanvas[0].graphicLayer2 ));
      }else if(cosw == true ){
        let particleX = mouseX - invisibleCanvas[0].x;
        let particleY = mouseY - invisibleCanvas[0].y;
        invisibleCanvas[0].objects.push( new CosineWave(particleX, particleY, invisibleCanvas[0].graphicLayer2 ));
      }  
    }
    if (mouseIsPressed == true && a == 1) {
      if(pa == true){ 
        let particleX = mouseX - invisibleCanvas[1].x;
        let particleY = mouseY - invisibleCanvas[1].y;
        invisibleCanvas[1].objects.push(new Particle(particleX, particleY, invisibleCanvas[1].graphicLayer2 ));
      }else if(fire == true ){
        let particleX = mouseX - invisibleCanvas[1].x;
        let particleY = mouseY - invisibleCanvas[1].y;
        for(let i = 0; i<PN ; i++){ 
        invisibleCanvas[1].objects.push( new Fireworks(particleX, particleY, invisibleCanvas[1].graphicLayer ));
        }
      }else if(sinw == true ){
        let particleX = mouseX - invisibleCanvas[1].x;
        let particleY = mouseY - invisibleCanvas[1].y;
        invisibleCanvas[1].objects.push( new SineWave(particleX, particleY, invisibleCanvas[1].graphicLayer2 ));
      }else if(line == true){
      invisibleCanvas[1].drawLine(pmouseX, pmouseY, mouseX, mouseY);
     }else if(cosw == true ){
      let particleX = mouseX - invisibleCanvas[1].x;
      let particleY = mouseY - invisibleCanvas[1].y;
      invisibleCanvas[1].objects.push( new CosineWave(particleX, particleY, invisibleCanvas[1].graphicLayer2 ));
    }
  }  
    if (mouseIsPressed == true && a == 2) {
      if(pa == true){
        //console.log("ready!!");
        let particleX = mouseX - invisibleCanvas[2].x;
        let particleY = mouseY - invisibleCanvas[2].y;
        invisibleCanvas[2].objects.push(new Particle(particleX, particleY, invisibleCanvas[2].graphicLayer2));
      }else if(fire == true ){
        let particleX = mouseX - invisibleCanvas[2].x;
        let particleY = mouseY - invisibleCanvas[2].y;
        for(let i = 0; i<PN ; i++){ 
        invisibleCanvas[2].objects.push( new Fireworks(particleX, particleY, invisibleCanvas[2].graphicLayer ));
        }
      }else if(line == true){
      invisibleCanvas[2].drawLine(pmouseX, pmouseY, mouseX, mouseY);
      }else if(sinw == true ){
        let particleX = mouseX - invisibleCanvas[2].x;
        let particleY = mouseY - invisibleCanvas[2].y;
        invisibleCanvas[2].objects.push( new SineWave(particleX, particleY, invisibleCanvas[2].graphicLayer2 ));
      }else if(cosw == true ){
        let particleX = mouseX - invisibleCanvas[2].x;
        let particleY = mouseY - invisibleCanvas[2].y;
        invisibleCanvas[2].objects.push( new CosineWave(particleX, particleY, invisibleCanvas[2].graphicLayer2 ));
      } 
    }
  //display invisble canvas & change thickness
  for (let i = 0; i < 3; i++) {
    invisibleCanvas[i].display();
    if(t == 2){
      strokeWidth = 2;
    }else if(t == 3){
      strokeWidth = 5;
    }else if(t == 4){
      strokeWidth = 10;
    }else if(t == 5){
      strokeWidth = 15;
    }else if(t == 6){
      strokeWidth = 20;
    }
    invisibleCanvas[i].t = strokeWidth;

  if(line == true){
    if(co == 1){
      invisibleCanvas[i].c = 0;
    }else if(co == 2){
      invisibleCanvas[i].c = "#0000FF ";
    }else if(co == 3){
      invisibleCanvas[i].c = "#FF0000" ;
    }else if(co == 4){
      invisibleCanvas[i].c = "#059D1C  " ;
    }else if(co == 5){
      invisibleCanvas[i].c = " #FFFB00 " ;
    }else if(co == 6){
      invisibleCanvas[i].c = " #773602 " ;
    }else if(co == 7){
      invisibleCanvas[i].c = "#FF8700  " ;
    }else if(co == 8){
      invisibleCanvas[i].c = " #C64B99  " ;
    }else if(co == 9){
      invisibleCanvas[i].c = " #FFFFFF " ; //eraser
    }else if(co == 10){
      invisibleCanvas[i].c = " pink " ;
    } 
  }  
    if(invisibleCanvas[i].c == " #FFFFFF "){
      currentColor = "#D2D6D3"; 
    }else{
      currentColor = invisibleCanvas[i].c;
    }

    if(pa == true){
      currentColor = 0;
      strokeWidth = 10;
    }else if(fire == true){
      currentColor = "#f0c800";
      strokeWidth = 10;
    }else if(sinw == true){
      currentColor = "#b4c8f5" ;
      strokeWidth = 10;
    }else if(cosw == true){
      currentColor = "#b48cf5" ;
      strokeWidth = 10;
    }
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
    this.graphicLayer2 = createGraphics(w,h);
    this.objects = []; 
  }
  display() {
    push();
    translate(this.x, this.y);
    // background
   // fill(40, 40, 230);
    fill(255);
    rect(0, 0, width * 0.4, height * 0.3);
    // draw graphic Layer
    this.displayGraphicLayer1();
    this.displayGraphicLayer2();
    if(this.covered == true){
      fill(230, 255, 255);
      rect(0, 0, this.w, this.h*0.96);
    } 
    pop();
    
  }
  displayGraphicLayer1(){
    image(this.graphicLayer, 0, 0);
  
  }
  displayGraphicLayer2(){
    this.refreshGraphicLayer2();
    image(this.graphicLayer2, 0, 0);
  }
  refreshGraphicLayer2(){
    this.graphicLayer2.clear();
    for(let i = 0; i<this.objects.length;i++){   
       this.objects[i].update();
       this.objects[i].display();
     
      //  this.objects[i].display1();
      //  this.objects[i].display2();
    }
  }
  drawLine(x1, y1, x2, y2) {
    // draw onto this.graphicLayer
    // this.graphicLayer.line(x1, y1, x2, y2);
    // take offset into account:
    // console.log("01",this.graphicLayer)
    this.graphicLayer.strokeWeight(this.t);
    this.graphicLayer.stroke(this.c);
    this.graphicLayer.line(x1 - this.x, y1 - this.y, x2 - this.x, y2 - this.y);
  }
  
  toggleCover(onOff) {
    // console.log("toggleCover")
    this.covered = onOff;
  }
}
class Particle{
constructor(mx,my, layer){
  this.x = mx;
  this.y = my;
  this.xSpeed = random(-1,1);
  this.ySpeed = random(-1,1);
  this.graphicLayer = layer;
}
update(){
 this.x += random(-0.3, 0.3);//this.xSpeed;
 this.y += random(-0.3, 0.3);//this.ySpeed;
 //this.ySpeed += 0.1;
}
display(){
  //this.fill = invisibleCanvas[0].c;
  this.graphicLayer.push();
  this.graphicLayer.translate(this.x,this.y);
  this.graphicLayer.fill(0);
  this.graphicLayer.noStroke();
  this.graphicLayer.circle(0,0,3);
  this.graphicLayer.pop();
 }
}

class Fireworks{
  constructor(mx,my, layer){
    this.x = mx;
    this.y = my;
    this.xSpeed = random(-0.1,0.1);
    this.ySpeed = random(-0.1,0.1);
    this.age += 0.5;
    this.graphicLayer = layer;
  }
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed; 
    if(this.age >= 5){
      this.xSpeed = 0;
      this.ySpeed = 0;
    }
    //console.log(this.age);
  }
  display(){
    this.graphicLayer.push();
    this.graphicLayer.translate(this.x,this.y);
    this.graphicLayer.fill(240,200,0,80);
    this.graphicLayer.noStroke();
    this.graphicLayer.circle(0,0,2)
    this.graphicLayer.pop();
  }
}

class SineWave{
  constructor(beginX,beginY,layer){
    this.x = beginX;
    this.y = beginY;
    this.xSpeed = random(-0.5,0.5);
    this.ySpeed = random(-0.5,0.5);
    this.freq = frameCount * 0.3;
    this.amp = 10;
    this.sinValue = sin(this.freq) * this.amp;
    this.graphicLayer = layer;
  }
  update(){
  }
  display(){
    this.graphicLayer.push();
    this.graphicLayer.translate(this.x,this.y);
    this.graphicLayer.noStroke();
    this.graphicLayer.fill(180,200,245);
    this.graphicLayer.circle(0,this.sinValue,5);
    this.graphicLayer.pop();
  }
}

class CosineWave{
  constructor(startX,startY,layer){
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(-0.5,0.5);
    this.ySpeed = random(-0.5,0.5);
    this.freq = frameCount * 0.3;
    this.amp = 10;
    this.cosValue = cos(this.freq) * this.amp;
    this.graphicLayer = layer;
  }
  update(){
  }
  display(){
    this.graphicLayer.push();
    this.graphicLayer.translate(this.x,this.y);
    this.graphicLayer.noStroke();
    this.graphicLayer.fill(180, 140, 245);
    this.graphicLayer.circle(this.cosValue,0,3);
    this.graphicLayer.pop();
  }
}

function button() {
   //1
   if(invisibleCanvas[0].covered == false && guidance == true){
  fill(0);
  textSize(12);
  textFont('Georgia');
  
  text("draw head part",width/2-100,height/2-280);
  text("leave some hints here",width/2-120,height/2-83);
  text("Done", width - 60, height / 2 - 250);
  noFill();
  rect(width - 70, height / 2 - 270, 50, 50);
   }
  //2
  if(invisibleCanvas[1].covered == false && guidance == true){
  fill(0);
  textSize(12);
  textFont('Georgia');
   text("draw body part",width/2-100,height/2-60);
   text("leave some hints here",width/2-120,height/2+150);
  text("Done", width - 60, height / 2 + 40);
  noFill();
  rect(width - 70, height / 2 + 20, 50, 50);
  }
  //3
  if(invisibleCanvas[2].covered == false && guidance == true){
  fill(0);
  textSize(12);
  textFont('Georgia');
  text("draw bottom part",width/2-100,height/2+172);
  text("Done", width - 60, height / 2 + 272);
  noFill();
  rect(width - 70, height / 2 + 240, 50, 50);
  }
  push();
  if(invisibleCanvas[0].covered == false && invisibleCanvas[1].covered == false && invisibleCanvas[2].covered == false){
    guidance = false;
  
  }
  pop();
}

function mousePressed(){
  if (
    width - 70 < mouseX &&
    mouseX < width - 20 &&
    height / 2 - 270 < mouseY &&
    mouseY < height / 2 - 220
  ) {
    a = 1;
    invisibleCanvas[1].toggleCover(false);
    invisibleCanvas[0].toggleCover(true);
  }else if ( width - 70 < mouseX &&
    mouseX < width - 20 &&
    height / 2 + 20 < mouseY &&
    mouseY < height / 2 + 70
  ) {
    a = 2;
    invisibleCanvas[1].toggleCover(true);
    invisibleCanvas[2].toggleCover(false);
  }else if (
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
   if(dist(mouseX,mouseY,width*0.15,height*0.1+80)<2.5){
    t = 2;
    pa = false;
    fire = false;
    sinw = false;
    cosw = false;
    line = true;
  }else if(dist(mouseX,mouseY,width*0.2,height*0.1+80)<5){
     t = 3;
     pa = false;
     fire = false;
     sinw = false;
     cosw = false;
     line = true;
  }else if(dist(mouseX,mouseY,width*0.25,height*0.1+80)<7.5){
    t = 4;
    pa = false;
    fire = false;
    sinw = false;
    cosw = false;
    line = true;
  }else if(dist(mouseX,mouseY,width*0.3,height*0.1+80)<10){
    t = 5;
    pa = false;
    fire = false;
    sinw = false;
    cosw = false;
    line = true;
  }else if(dist(mouseX,mouseY,width*0.35,height*0.1+80)<12.5){
    t = 6;
    pa = false;
    fire = false;
    sinw = false;
    cosw = false;
    line = true;
  }
   if(dist(mouseX,mouseY,width*0.2,height*0.1+140)<10){
    co = 1;
  }else if(dist(mouseX,mouseY,width*0.25,height*0.1+140)<10){
    co = 2;
  }else if(dist(mouseX,mouseY,width*0.3,height*0.1+140)<10){
    co = 3;
  }else if(dist(mouseX,mouseY,width*0.35,height*0.1+140)<10){
    co = 4;
  }else if(dist(mouseX,mouseY,width*0.15,height*0.1+180)<10){
    co = 5;
  }else if(dist(mouseX,mouseY,width*0.2,height*0.1+180)<10){
    co = 6;
  }else if(dist(mouseX,mouseY,width*0.25,height*0.1+180)<10){
    co = 7;
  }else if(dist(mouseX,mouseY,width*0.3,height*0.1+180)<10){
    co = 8;
  }else if(mouseX>width*0.1+20 && mouseX<width*0.4-20 && mouseY<height*0.1+580 && mouseY>height*0.1+540){
    co = 9;
  }else if(dist(mouseX,mouseY,width*0.15,height*0.1+140)<10){
    co = 9;
  }else if(dist(mouseX,mouseY,width*0.35,height*0.1+180)<10){
    co = 10;
  }
  if(mouseX>width*0.15 && mouseX<width*0.15+150 && mouseY<height*0.1+320 && mouseY>height*0.1+280 ){
    console.log("particles!!")
    pa = true; 
    fire = false;
    sinw = false;
    line = false;
    cosw = false;
  }else if(mouseX>width*0.15 && mouseX<width*0.15+150 && mouseY<height*0.1+420 && mouseY>height*0.1+380 ){
   fire = true;
   pa = false;
   sinw = false;
   line = false;
   cosw = false;
  }else if(mouseX>width*0.27 && mouseX<width*0.27+150 && mouseY<height*0.1+320 && mouseY>height*0.1+280){
    sinw = true;
    pa = false;
    fire = false;
    line = false;
    cosw = false;
  }else if(mouseX>width*0.27 && mouseX<width*0.27+150 && mouseY<height*0.1+420 && mouseY>height*0.1+380){
    cosw = true;
    sinw = false;
    pa = false;
    fire = false;
    line = false;
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
  fill("white");
  circle(tx*1.5, ty + 140, 20);
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
  fill("pink");
  circle(tx *3.5, ty + 180, 20);
  
  pop();
  //sticker
  rect(tx + 20, ty + 220, tw - 40, 320);
  //particle
  image(Image1,tx*1.5,ty+280,150,50);
  //fireworks
  image(Image2,tx*1.5,ty+380,150,50);
  //sinewaves
  image(Image3,tx*2.7,ty+280,150,50);
  //cosinewaves
  image(Image4,tx*2.7,ty+380,150,50);
  
  //eraser
  rect(tx + 20, ty + 560, tw - 40, 40);
  push();
  textSize(24);
  fill(220);
  text("ERASER",tx*2 , ty + 585);
  pop();
}

