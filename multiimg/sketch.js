let img = [];
let b=0;

function preload(){
   for(let i = 0;i<9;i++){
        let filename = "muybridge/muybridge_" + i + ".jpg";
        img.push(loadImage(filename));
        //console.log(filename);
    }
}

function setup(){
    let cnv = createCanvas(400,400);
    cnv.parent("canvasContainer"); 
}

function draw(){
   background(120,40,240);
    push();
    scale (0.5);
    image(img[round(b)],0,0);
    pop ();
    b+=0.1;
    if(b>8){
        b=0;
    }
    //if(frameCount%10 == 0){
    //    b++;
    //}
}