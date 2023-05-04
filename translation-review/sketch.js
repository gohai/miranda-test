let sqSize = 50;
let angle = 20;
let angle2 = 10;
let bigRadius = 50;

function setup(){
    
    let cnv = createCanvas(400,400);
    cnv.parent("canvasContainer");
    background(120,40,240); 
}

function draw(){
    
    push ();
   translate (width/2,height/2);
   //let angleValue = radians(angle);
   rotate (radians(angle));
//    rect(100,100,50,50);
   push();
   translate(bigRadius,0);
   rotate(radians(angle2));
//    rect (-sqSize /2,-sqSize /2,sqSize ,sqSize )
   fill(0);
   noStroke();
   circle (-sqSize /2,-sqSize /2,2);
   circle (sqSize /2,-sqSize /2,2);
   circle (sqSize /2,sqSize /2,2);
   circle (-sqSize /2,sqSize /2,2);
   fill(0,255,0);
   circle(0,0,1);
   pop ();
   fill (255,0,0);
    circle(0,0,5);
    angle+=1;
    angle2+=2;
    bigRadius-=0.05;
    sqSize += 0.01;
    pop ();

}