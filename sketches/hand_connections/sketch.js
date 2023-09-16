// Hand detection with mediapipe
// https://google.github.io/mediapipe/solutions/hands.html
// Adapted from "Multiple Hands Detection in p5.js" by Kazuki Umeda (https://www.youtube.com/watch?v=BX8ibqq0MJU)

let sketch = function (p) {
  let pdf;
  let captureHands = false;
  let modes = ["NONE", "ALL_TO_ALL", "INDEX_TO_ALL", "INDEX_TO_INDEX", "INDEX_TO_INDEX_CURVE", "ALL_TO_ALL_CURVE"];
  let mode = 0;
  let anchorKeypoint = 0;

  const PALM = [0, 1, 5, 9, 13, 17, 0];
  const THUMB = [1, 2, 3, 4];
  const INDEX_FINGER = [5, 6, 7, 8];
  const MIDDLE_FINGER = [9, 10, 11, 12];
  const RING_FINGER = [13, 14, 15, 16];
  const PINKY_FINGER = [17, 18, 19, 20];

  const HAND_PARTS = [PALM, THUMB, INDEX_FINGER, MIDDLE_FINGER, RING_FINGER, PINKY_FINGER];


  p.setup = function () {
    p.createCanvas(cam_w, cam_h, p.SVG);
  }

  p.draw = function () {
    p.clear(0);

    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined && detections.multiHandLandmarks.length > 0) {
        p.drawHands();
      }
    }
  }

  ///////// FUNCTIONS //////////

  /*************************************/
  // drawHands draws the hands, and accepts arguments for various modes for drawing the hand connections
  p.drawHands = function () {
    p.drawConnectingLines(modes[mode]);
    p.drawSeparator();
    p.drawHandLines();
    p.drawSeparator();
    p.drawLandmarks();
  }

  /*************************************/
  // drawConnectingLines draws lines that connect each keypoint between each hand
  p.drawConnectingLines = function (mode) {

    if (detections.multiHandLandmarks.length == 2) {
      p.stroke(255, 80, 0);
      p.strokeWeight(.5);

      switch (mode) {
        case "NONE":
          break;
        case "ALL_TO_ALL":
          for (let i = 0; i < detections.multiHandLandmarks[0].length; i++) {
            const hand0 = p.createVector(p.width - (detections.multiHandLandmarks[0][i].x * p.width),
              detections.multiHandLandmarks[0][i].y * p.height);
            const hand1 = p.createVector(p.width - (detections.multiHandLandmarks[1][i].x * p.width),
              detections.multiHandLandmarks[1][i].y * p.height);

            p.beginShape(p.LINES)
            p.vertex(hand0.x, hand0.y);
            p.vertex(hand1.x, hand1.y);
            p.endShape();
          }
          break;
        case "INDEX_TO_ALL":
          for (let i = 0; i < detections.multiHandLandmarks[0].length; i++) {
            const hand0 = p.createVector(p.width - (detections.multiHandLandmarks[0][i].x * p.width),
              detections.multiHandLandmarks[0][i].y * p.height);
            const hand1 = p.createVector(p.width - (detections.multiHandLandmarks[1][8].x * p.width),
              detections.multiHandLandmarks[1][8].y * p.height);

            p.beginShape(p.LINES)
            p.vertex(hand0.x, hand0.y);
            p.vertex(hand1.x, hand1.y);
            p.endShape();
          }
          break;
        case "INDEX_TO_INDEX":
          {
            const hand0 = p.createVector(p.width - (detections.multiHandLandmarks[0][8].x * p.width),
              detections.multiHandLandmarks[0][8].y * p.height);
            const hand1 = p.createVector(p.width - (detections.multiHandLandmarks[1][8].x * p.width),
              detections.multiHandLandmarks[1][8].y * p.height);

            p.beginShape(p.LINES)
            p.vertex(hand0.x, hand0.y);
            p.vertex(hand1.x, hand1.y);
            p.endShape();
          }
          break;
        case "INDEX_TO_INDEX_CURVE":
          {
            const index0Tip = p.createVector(p.width - (detections.multiHandLandmarks[0][8].x * p.width),
              detections.multiHandLandmarks[0][8].y * p.height);
            const index0Base = p.createVector(p.width - (detections.multiHandLandmarks[0][0].x * p.width),
              detections.multiHandLandmarks[0][0].y * p.height);
            const index1Tip = p.createVector(p.width - (detections.multiHandLandmarks[1][8].x * p.width),
              detections.multiHandLandmarks[1][8].y * p.height);
            const index1Base = p.createVector(p.width - (detections.multiHandLandmarks[1][0].x * p.width),
              detections.multiHandLandmarks[1][0].y * p.height);

            p.beginShape()
            p.curveVertex(index0Base.x, index0Base.y);
            p.curveVertex(index0Base.x, index0Base.y);
            p.curveVertex(index0Tip.x, index0Tip.y);
            p.curveVertex(index1Tip.x, index1Tip.y);
            p.curveVertex(index1Base.x, index1Base.y);
            p.curveVertex(index1Base.x, index1Base.y);
            p.endShape();
          }
          break;

        case "ALL_TO_ALL_CURVE":
          for (let i = 1; i < detections.multiHandLandmarks[0].length; i++) {
            const hand0palm = p.createVector(p.width - (detections.multiHandLandmarks[0][anchorKeypoint].x * p.width),
              detections.multiHandLandmarks[0][anchorKeypoint].y * p.height);
            const hand1palm = p.createVector(p.width - (detections.multiHandLandmarks[1][anchorKeypoint].x * p.width),
              detections.multiHandLandmarks[1][anchorKeypoint].y * p.height);

            const hand0 = p.createVector(p.width - (detections.multiHandLandmarks[0][i].x * p.width),
              detections.multiHandLandmarks[0][i].y * p.height);
            const hand1 = p.createVector(p.width - (detections.multiHandLandmarks[1][i].x * p.width),
              detections.multiHandLandmarks[1][i].y * p.height);

            p.beginShape()
            p.curveVertex(hand0palm.x, hand0palm.y);
            p.curveVertex(hand0palm.x, hand0palm.y);
            p.curveVertex(hand0.x, hand0.y);
            p.curveVertex(hand1.x, hand1.y);
            p.curveVertex(hand1palm.x, hand1palm.y);
            p.curveVertex(hand1palm.x, hand1palm.y);
            p.endShape();
          }
          break;

      }
    }
  }

  /*************************************/
  // drawSeparator draws a square in the corner, which can be used to find separations between drawn elements in Inkscape
  p.drawSeparator = function () {
    p.strokeWeight(4);
    p.stroke(p.random(255), p.random(255), p.random(255));
    p.rect(0, 0, 10, p.random(10));
  }


  /*************************************/
  // drawLandmarks draws a point at each keypoint on each hand
  p.drawLandmarks = function () {

    p.stroke(0);
    p.strokeWeight(1);
    p.noFill();

    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = 0; j < detections.multiHandLandmarks[i].length; j++) {

        const x = p.width - (detections.multiHandLandmarks[i][j].x * p.width);
        const y = detections.multiHandLandmarks[i][j].y * p.height;
        p.ellipse(x, y, 10, 10);
      }
    }
  }

  /*************************************/
  // drawHandLines draws lines that connect each keypoint within a hand
  p.drawHandLines = function () {

    p.noFill();
    p.strokeWeight(2);
    p.stroke(100, 255, 255);

    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = 0; j < HAND_PARTS.length; j++) {

        p.beginShape();
        for (let k = 0; k < HAND_PARTS[j].length; k++) {

          const currPoint = HAND_PARTS[j][k];
          const x = p.width - (detections.multiHandLandmarks[i][currPoint].x * p.width);
          const y = detections.multiHandLandmarks[i][currPoint].y * p.height;
          p.vertex(x, y);
        }
        p.endShape();
      }
    }
  }

  /*************************************/
  // use keypressed to toggle capture mode
  p.keyPressed = function () {
    switch (p.keyCode) {
      case p.LEFT_ARROW:
        mode = (mode - 1 + modes.length) % modes.length;
        console.log(mode)
        break;
      case p.RIGHT_ARROW:
        mode = (mode + 1) % modes.length;
        console.log(mode)
        break;
      case p.UP_ARROW:
        anchorKeypoint = (anchorKeypoint - 1 + 21) % 21;
        console.log(anchorKeypoint)
        break;
      case p.DOWN_ARROW:
        anchorKeypoint = (anchorKeypoint + 1) % 21;
        console.log(anchorKeypoint)
        break;
      case 32: {
        captureHands = !captureHands;
        break;
      }
    }
  }

  setInterval(function () {
    if (captureHands) {
      pdf = p.createPDF();
      pdf.beginRecord();
      pdf.save();
    }
  }, 10000)
}

let myp5 = new p5(sketch)