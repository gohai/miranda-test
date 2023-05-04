// let x1=200;
// let b = 100;
let noisePointer = 0;
let sinPointer = 0;
let xPos = [100,120,2,50,320];
function setup(){
    let cnv = createCanvas(400,400);
    cnv.parent("canvasContainer");
    
}

function draw(){ //frame of animation
    background(250,50);
    
    //fill(30,10,b); 
    // circle(x1,100,50);
    // circle(200,150,20);
    //  x1=x1+1; 
    // b=frameCount%255 //% is remainder operator
// for(let  y =0;y<height;y+=10){
//      for(let i = 0; i <width;i+=10){
//         fill(255);
//         rect(i,y,10,10);
//         if(mouseX>i&&mouseX<i+10&&mouseY>y&&mouseY<y+10){
//             fill(0);
//             rect(i,y,10,10);
//         }
//          }
//         }
// sin();//-1,1
// cos();//-1,1
// noise();//0,1
//random();//0,1

noStroke();
fill(0,100);
let x = map(noise(noisePointer),0,1,100,300);
circle(x,height/2,10);
noisePointer+=0.02;

let sinValue = sin(sinPointer);

}