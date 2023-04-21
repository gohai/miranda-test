function setup(){
    let cnv = createCanvas(400,600);
    cnv.parent("canvasContainer");
    background(176, 224, 230);
}

function draw() {
    fill(105, 105, 105);
    stroke(255, 250, 205);
    strokeWeight(1);
    rect(0, 260, 400, 180);
   
    strokeWeight(1);
  
    fill(155, 205, 155);
    beginShape();
    curveVertex(118, 350);
    curveVertex(118, 350);
    curveVertex(110, 362);
    curveVertex(78, 392);
    curveVertex(0, 434);
    curveVertex(175, 470);
    curveVertex(158, 419);
    curveVertex(153, 380);
    curveVertex(153, 380);
    endShape();
  
    strokeWeight(1);
    fill(32, 178, 170);
    beginShape();
    curveVertex(260, 250);
    curveVertex(260, 250);
    curveVertex(295, 300);
    curveVertex(400, 320);
    curveVertex(400, 440);
    curveVertex(330, 460);
    curveVertex(190, 420);
    curveVertex(100, 350);
    curveVertex(150, 250);
    curveVertex(150, 250);
    // curveVertex();
    endShape();
  
    noStroke();
    fill(245, 245, 245);
    circle(340, 80, 5);
    fill(255, 250, 205);
    rect(0, 180, 400, 35);
    fill(255, 228, 225);
    rect(0, 215, 400, 25);
    fill(230, 230, 250);
    rect(0, 240, 400, 20);
  
    fill("black");
    strokeWeight(1.5);
    stroke("black");
    rect(300, 260, 18, 40);
    rect(320, 240, 28, 60);
    rect(350, 210, 38, 90);
    rect(390, 225, 18, 75);
    fill(245, 245, 245);
    noStroke();
    rect(302, 270, 10, 3);
    rect(302, 275, 10, 3);
    rect(302, 280, 10, 3);
    rect(302, 285, 10, 3);
    rect(325, 250, 6, 6);
    rect(338, 250, 6, 6);
    rect(325, 260, 6, 6);
    rect(338, 260, 6, 6);
    rect(325, 270, 6, 6);
    rect(338, 270, 6, 6);
    rect(325, 280, 6, 6);
    rect(338, 280, 6, 6);
    fill("red");
    noStroke();
    rect(348, 220, 3, 2);
    rect(348, 230, 3, 2);
    rect(348, 240, 3, 2);
    rect(348, 250, 3, 2);
    rect(388, 220, 3, 2);
    rect(388, 230, 3, 2);
    rect(388, 240, 3, 2);
    rect(388, 250, 3, 2);
  
    // fill(255, 255, 100);
    // rect(349,200,40,30);
  
    fill(105, 139, 105);
    stroke(255, 250, 205);
    strokeWeight(8);
    triangle(0, 520, 70, 520, 0, 590);
    quad(80, 520, 280, 520, 200, 600, 0, 600);
    quad(290, 520, 490, 520, 500, 600, 210, 600);
    quad(0, 440, 161, 440, 81, 515, 0, 515);
    quad(170, 440, 360, 440, 290, 515, 90, 515);
    quad(370, 440, 400, 440, 400, 515, 300, 515);
  
    strokeWeight(8);
    stroke("white");
    noFill();
    arc(110, 440, 80, 70, PI, 0);
    stroke(139, 137, 137);
    arc(95, 442, 80, 70, PI, 0);
  }
  
  // function mousePressed() {
  //  console.log(mouseX, mouseY);
  //  fill(255, 0, 0);
  //  ellipse(mouseX, mouseY, 10, 10);
  // }
  