let gradient ;


function preload (){
    gradient = loadImage ("assets/gradient-bkg.png")
   
}

function setup(){
    let cnv = createCanvas(400,400);
    cnv.parent("canvasContainer");
  
}

function draw(){
     // background(120,40,240);
  image(gradient,0,0,width,height);
   //draw sth on top
  circle(frameCount,100,40);
 
}