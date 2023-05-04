let basket = [];
let cover = [];
let c = 0;
let t = 2;
let a = 1;
let opacity = 255;
// let cover1 = true;
// let cover2 = true;
// let cover3 = true;


function setup(){
    let cnv = createCanvas(windowWidth,windowHeight);
    cnv.parent("canvasContainer");
    background(240,255,255);
    push();
    noStroke();
    fill (255);
    rect(width/2,height*0.1,width*0.4,height*0.9);
    pop();
    for(let i = 0;i<0.9*height;i+= height*0.3){
        let canva = new Borders(width/2,i+height*0.1); 
        basket.push(canva);
        }
    for(let i = 0;i<0.9*height;i+= height*0.3){
        let p = new Covers(width/2,i+height*0.1); 
         cover.push(p);
          }
}

function draw() { 

    ToolBar(); 
    Button();
    Uncover();

    // console.log(opacity)

    for (i = 0; i < basket.length; i++) {
      basket[i].update();
      basket[i].display();
    }
    //draw line for first section
    push();
    if(mouseIsPressed == true){
      if(width/2<mouseX&&mouseX<width*0.9&&height*0.1<mouseY&&mouseY<height*0.4&&width/2<pmouseX&&pmouseX<width*0.9&&height*0.1<pmouseY&&pmouseY<height*0.4){
        DrawingLine();
      }
    }
    pop();
    //cover first section
    //push();
    if(mouseIsPressed == true && width-70<mouseX&&mouseX<width-20&&height/2-240<mouseY&&mouseY<height/2-215){
     //Cover(width/2,height*0.1)
      cover[0].display();
    }
    //pop();
    //active the second section
    push();
    if(mouseIsPressed == true && width-70<mouseX && mouseX<width-20 && height/2-200<mouseY && height/2-175>mouseY){
      a = 2;
    }
    //draw on second section
    if(a == 2){
      if(mouseIsPressed == true){
        if(width/2<mouseX&&mouseX<width*0.9&&height*0.4<mouseY&&mouseY<height*0.7&&width/2<pmouseX&&pmouseX<width*0.9&&height*0.4<pmouseY&&pmouseY<height*0.7){
          DrawingLine();
        }
      }
    }
    pop();
    //cover second section
   // push();
    if(mouseIsPressed == true && width-70<mouseX && mouseX<width-20 && height/2-20<mouseY && height/2+5>mouseY){
     
      //Cover(width/2,height*0.39)
      cover[1].display();
    }
    //pop();
    //activate third section
    push();
    if(mouseIsPressed == true && width-70<mouseX && mouseX<width-20 && height/2+20<mouseY && height/2+45>mouseY){
      a = 3;
    }
    if(a == 3){
      if(mouseIsPressed == true){
        if(width/2<mouseX&&mouseX<width*0.9&&height*0.7<mouseY&&mouseY<height&&width/2<pmouseX&&pmouseX<width*0.9&&height*0.7<pmouseY&&pmouseY<height){
          DrawingLine();
        }
    }
  }
   pop();

   //cover third
   //push();
   if(mouseIsPressed == true && width-70<mouseX && mouseX<width-20 && height/2+200<mouseY && height/2+225>mouseY){
    
      //Cover(width/2,height*0.69)
      cover[2].display();
   }
   //pop();

  }

  class Borders{
    constructor(startX, startY) {
      this.x = startX;
      this.y = startY;
     // this.light = color(255);
      // this.c = this.light;   
    }
    update(){  
    }
    display(){
      push();
      translate(this.x, this.y);
      noFill();
      //noStroke();
      rect(0, 0, width*0.4, height*0.3);
      pop();
    }
    
  }

  class Covers{
    constructor(cX, cY) {
      this.x = cX;
      this.y = cY;
      
    }
    update(){  
    }
    display(){
      push();
      translate(this.x, this.y);
      fill(0);
      noStroke();
      rect(0, 0, width*0.4, height*0.29);
      pop();
    }
    
  }
  
  function DrawingLine(){
  stroke(c);
  strokeWeight(t);
  line (pmouseX,pmouseY,mouseX,mouseY)
  }

  // function Cover(x,y){
  //   fill(0, 0, 0, opacity);
  //     noStroke();
  //     rect(x,y,width*0.4,height*0.29);
  // }

  function Button(){
   //2 
    fill(0);
  text("Done",width-60,height/2-5);
  text("Next",width-60,height/2+40);
  noFill();
  rect(width-70,height/2+20,50,25);  
  rect(width-70,height/2-20,50,25);
//1
  fill(0);
  text("Done",width-60,height/2-225);
  text("Next",width-60,height/2-180);
  noFill();
  rect(width-70,height/2-200,50,25);  
  rect(width-70,height/2-240,50,25);
//3
  fill(0);
  text("Done",width-60,height/2+215);
  text("Next",width-60,height/2+255);
  noFill();
  rect(width-70,height/2+240,50,25);  
  rect(width-70,height/2+200,50,25);
  }

function Uncover(){
  //uncover
  if(mouseIsPressed == true && width-70<mouseX && mouseX<width-20 && height/2+240<mouseY && height/2+265>mouseY){
    // cover1 = false;
    // cover2 = false;
    // cover3 = false;
    // opacity = 0;
    cover.splice(0, 1);
    console.log(cover);
   }
}

  function ToolBar(){
    let x=width*0.1;
  let y = height*0.1;
  let w = width*0.3;
  let h = height*0.8;
    //tool bar
    noFill();
    rect(x,y,w,h);
    //pen
    rect(x+20,y+60,w-40,40);
    //color
    rect(x+20,y+120,w-40,80);
    //sticker
    rect(x+20,y+220,w-40,320);
    //eraser
    rect(x+20,y+560,w-40,40);
  }
  
  