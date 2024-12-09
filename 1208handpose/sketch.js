let capture, buffer, result;
let handPose, hands = [];
let targetRect;
let handGuideImg;
let capturedImage = null;
let captureCount = 0;
let w = 640, h = 480;
let guideAlpha = 128; //transparency for hand
let isCapturing = false; 

function preload() {
    handPose = ml5.handPose();
    handGuideImg = loadImage('hand_guide.png');
}

function setup() {
    createCanvas(w, h);

    capture = createCapture(VIDEO);
    
    capture.size(w, h);
    capture.hide();

    buffer = new jsfeat.matrix_t(w, h, jsfeat.U8C1_t);

    let rectWidth = 300;
    let rectHeight = 350;
    targetRect = {
        x: (width - rectWidth) / 2,
        y: (height - rectHeight) / 2,
        w: rectWidth,
        h: rectHeight,
    };

    handPose.detectStart(capture, gotHands);
}

function gotHands(results) {
    hands = results;
}

function isRectFit(rect1, rect2) {
    let positionThreshold = 30;
    let sizeThreshold = 0.25;

    let center1X = rect1.x + rect1.w / 2;
    let center1Y = rect1.y + rect1.h / 2;
    let center2X = rect2.x + rect2.w / 2;
    let center2Y = rect2.y + rect2.h / 2;

    let centerDist = dist(center1X, center1Y, center2X, center2Y);

    let widthDiff = abs(rect1.w - rect2.w) / rect2.w;
    let heightDiff = abs(rect1.h - rect2.h) / rect2.h;

    return (
        centerDist < positionThreshold &&
        widthDiff < sizeThreshold &&
        heightDiff < sizeThreshold
    );
}

async function captureFrame() {
    isCapturing = true;
  
    draw();
  
    capturedImage = get(targetRect.x, targetRect.y, targetRect.w, targetRect.h);
    capturedImage.save('hand_contour_' + captureCount, 'png');
    captureCount++;
    
    isCapturing = false;
}

function draw() {
    translate(capture.width,0);
    scale(-1,1)
    capture.loadPixels();
    if (capture.pixels.length > 0) {
        let blurSize = 4;
        let lowThreshold = 5;
        let highThreshold = 38;

        jsfeat.imgproc.grayscale(capture.pixels, w, h, buffer);
        jsfeat.imgproc.gaussian_blur(buffer, buffer, blurSize, 0);
        jsfeat.imgproc.canny(buffer, buffer, lowThreshold, highThreshold);

        for (let i = 0; i < buffer.data.length; i++) {
            buffer.data[i] = 255 - buffer.data[i];
        }

        result = jsfeatToP5(buffer, result);
        image(result, 0, 0, w, h);

       
        if (handGuideImg && !isCapturing) {
            push();
            tint(255, guideAlpha);
            image(handGuideImg, 
                  targetRect.x, 
                  targetRect.y, 
                  targetRect.w, 
                  targetRect.h);
            pop();
        }

        
        // if (!isCapturing) {
        //     noFill();
        //     stroke(255, 0, 0, 100);
        //     strokeWeight(1);
        //     rect(targetRect.x, targetRect.y, targetRect.w, targetRect.h);
        // }

        // check if hand fits
        for (let i = 0; i < hands.length; i++) {
            let hand = hands[i];
            let keypoints = hand.keypoints;

            let minX = width, minY = height, maxX = 0, maxY = 0;
            for (let keypoint of keypoints) {
                minX = min(minX, keypoint.x);
                minY = min(minY, keypoint.y);
                maxX = max(maxX, keypoint.x);
                maxY = max(maxY, keypoint.y);
            }

            let padding = 20;
            minX -= padding;
            minY -= padding;
            maxX += padding;
            maxY += padding;

            let handRect = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };

            if (isRectFit(handRect, targetRect)) {
                if (!capturedImage && !isCapturing) {
                    captureFrame();
                    console.log("Image Captured!");
                }
            } else if (!isCapturing) {
                //box is red when not capturing
                stroke(255, 200, 0, 100);
                noFill();
                rect(handRect.x, handRect.y, handRect.w, handRect.h);
            }
        }
    }
}

function jsfeatToP5(src, dst) {
    if (!dst || dst.width != src.cols || dst.height != src.rows) {
        dst = createImage(src.cols, src.rows);
    }
    dst.loadPixels();
    for (let i = 0, j = 0; i < src.data.length; i++) {
        let val = src.data[i];
        dst.pixels[j++] = val;
        dst.pixels[j++] = val;
        dst.pixels[j++] = val;
        dst.pixels[j++] = 255;
    }
    dst.updatePixels();
    return dst;
}