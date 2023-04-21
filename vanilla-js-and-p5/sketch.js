let x=200;
let xSpeed = 1;

let FasterButton = document.getElementById("fast");


function setup(){
    let cnv = createCanvas(400,400);
    cnv.parent("canvasContainer");
  
}

function draw(){
    background(120,40,240);
  noStroke(); 
 circle(x,height/2,50);

x += xSpeed;
if(x>width){
    x=0;
 }
}
function increaseSpeed(){
    xSpeed ++;
}

FasterButton.addEventListener("click",increaseSpeed);