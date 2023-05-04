// sounds from:
// https://freesound.org/people/GowlerMusic/sounds/266566/
// https://freesound.org/people/cfork/sounds/8000/
// https://freesound.org/people/ccolbert70Eagles23/sounds/423526/


let bodies = [];
let creatures = [];
let numCreatures = 5;
let karate;
let gong;
let plop;
function preload(){
    for(let i = 0; i < 3; i++){
        bodies.push( loadImage("bodies/body_"+i+".png"))
    }

    karate = loadSound("sounds/423526__ccolbert70eagles23__karate-chop.m4a")
}

function setup(){
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasContainer");  
   for (let i=0;i<numCreatures;i++){
    let newCreatures = new Creature(random(width),random(height));
    creatures.push(newCreatures);
   }
}

function draw(){
    background(120, 40, 240);
    for(let i=0;i<creatures.length;i++){
        creatures[i].update();
        creatures[i].display();
    }
    // push ();
    // translate(width/2,height/2);
    // scale (0.5);
    // let imageWidth = bodies[0].width;
    // let imageHeight = bodies[0].height;
    // image(bodies[0],-imageWidth/2 , -imageHeight/2);
    // pop ();
}


class Creature{
    constructor(x_, y_){
        this.x = x_;
        this.y = y_;
        this.xSpeed = random(-2, 2);
        this.ySpeed = random(2, 2);
        this.bodyIndex = floor(random(0,3))
        this.radius = 65;

    }
    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.x>=width-this.radius/2||this.x<=this.radius/2){
            this.xSpeed = -this.xSpeed;
           // karate.play();
        }
        if(this.y >=height-this.radius/2||this.y<=this.radius/2){
            this.ySpeed=-this.ySpeed;
        }
    }
    display(){
        push();
        translate(this.x, this.y)
        
       if(this.bodyIndex==0){
        fill (100,20,40);   
       }
       if(this.bodyIndex ==1){
        fill(240,255,255);  
       }
       if(this.bodyIndex ==2){
        fill(210,180,245);   
       } 
       circle (0,0,30);
         push ();
        //translate(0,0);
        scale (0.1);
        let imageWidth = bodies[0].width;
        let imageHeight = bodies[0].height;
        image(bodies[this.bodyIndex],-imageWidth/2 , -imageHeight/2);
       
        pop ();
        pop();
    }
}

