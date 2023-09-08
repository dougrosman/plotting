// Hand detection with mediapipe
// https://google.github.io/mediapipe/solutions/hands.html
// Adapted from "Multiple Hands Detection in p5.js" by Kazuki Umeda (https://www.youtube.com/watch?v=BX8ibqq0MJU)

let sketch = function (p) {

  let font;

  const PALM = [0, 1, 5, 9, 13, 17, 0];
  const THUMB = [1, 2, 3, 4];
  const INDEX_FINGER = [5, 6, 7, 8];
  const MIDDLE_FINGER = [9, 10, 11, 12];
  const RING_FINGER = [13, 14, 15, 16];
  const PINKY_FINGER = [17, 18, 19, 20];

  const HAND_PARTS = [PALM, THUMB, INDEX_FINGER, MIDDLE_FINGER, RING_FINGER, PINKY_FINGER];

  p.preload = function () {
    font = p.loadFont("Poppins-Medium.ttf");
  }

  p.setup = function () {
    p.createCanvas(cam_w, cam_h);
    p.textFont(font);
    p.textSize(16)
  }

  p.draw = function () {
    p.clear(0);

    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined) {
        p.drawHands();
      }
    }
  }

  p.drawHands = function () {
    p.stroke(0, 255, 0);


    // loop through both hands
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {

      // draw the lines between the hands

      if (detections.multiHandLandmarks.length == 2) {


        p.stroke(255, 80, 0);
        p.strokeWeight(1);

        for (let j = 0; j < detections.multiHandLandmarks[0].length; j++) {

          const hand0x = p.width - (detections.multiHandLandmarks[0][j].x * p.width);
          const hand0y = detections.multiHandLandmarks[0][j].y * p.height;

          const hand1x = p.width - (detections.multiHandLandmarks[1][j].x * p.width);
          const hand1y = detections.multiHandLandmarks[1][j].y * p.height;

          p.line(hand0x, hand0y, hand1x, hand1y);
        }
      }





      // draw the hand lines
      // loop through the array of hand parts
      for (let j = 0; j < HAND_PARTS.length; j++) {

        p.push();
        p.noFill();
        p.strokeWeight(2);
        p.stroke(255 / j, 0, 255);
        p.beginShape();
        for (let k = 0; k < HAND_PARTS[j].length; k++) {
          const currPoint = HAND_PARTS[j][k];

          const x = p.width - (detections.multiHandLandmarks[i][currPoint].x * p.width);
          const y = detections.multiHandLandmarks[i][currPoint].y * p.height;

          p.vertex(x, y);
        }
        p.endShape();
        p.pop();

      }


      // loop through the current hand and draw a circle at each keypoint
      for (let j = 0; j < detections.multiHandLandmarks[i].length; j++) {

        const x = p.width - (detections.multiHandLandmarks[i][j].x * p.width);
        const y = detections.multiHandLandmarks[i][j].y * p.height;

        p.strokeWeight(8);
        p.stroke(0, 255, 0);
        p.point(x, y);

      }
    }
  }
}

let myp5 = new p5(sketch)