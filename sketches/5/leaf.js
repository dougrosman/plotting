// Droplet/leaf shape from quadrilateral

// https://editor.p5js.org/mwburke/sketches/049shRyQn

let pts = [];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360);
  pts = [
    createVector(200, 50), //top
    createVector(100, 200),//left
    createVector(200, 350),//bottom
    createVector(300, 200) //right
    
  ];
  // noLoop();
}



function draw_leaf(points) {
  // strokeCap(ROUND);
  curveTightness(-0.2);
  // strokeWeight(2);
  // stroke(0);
  noStroke();
  fill(0);
  
  let p1 = p5.Vector.lerp(points[1], points[2], 0.5);
  let p1_reverse = p5.Vector.lerp(points[3], points[2], 0.5);
  let p2 = p5.Vector.lerp(points[0], points[2], 0.95);
  let p23 = p5.Vector.lerp(points[2], points[3], 0.75);
  let p23_reverse = p5.Vector.lerp(points[2], points[1], 0.75);
  let p3 = p5.Vector.lerp(points[1], p23, 0.95)
  let p3_reverse = p5.Vector.lerp(points[3], p23_reverse, 0.95);
  let p4 = p5.Vector.lerp(points[3], points[0], 0.8);
  let p4_reverse = p5.Vector.lerp(points[1], points[0], 0.8);
  let p_5 = p5.Vector.lerp(p4, points[1], 0.09);
  let p_5_reverse = p5.Vector.lerp(p4_reverse, points[3], 0.09);
  let p6 = p5.Vector.lerp(points[0], points[2], 0.05);
  
  stroke(0);
  beginShape();
  curveVertex(p1.x, p1.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p3.x, p3.y);
  curveVertex(p_5.x, p_5.y);
  vertex(p6.x, p6.y);
  curveVertex(p_5_reverse.x, p_5_reverse.y);
  curveVertex(p3_reverse.x, p3_reverse.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p1_reverse.x, p1_reverse.y);
  endShape();
  
  
  strokeWeight(10);
  stroke(0, 360, 360);
  point(p1.x, p1.y);
  stroke(40, 360, 360);
  point(p2.x, p2.y);
  stroke(80, 360, 360);
  point(p3.x, p3.y);
  stroke(120, 360, 360);
  point(p_5.x, p_5.y);
  stroke(160, 360, 360);
  point(p6.x, p6.y);
  stroke(200, 360, 360);
  point(p_5_reverse.x, p_5_reverse.y);
  stroke(240, 360, 360);
  point(p3_reverse.x, p3_reverse.y);
  stroke(280, 360, 360);
  point(p2.x, p2.y);
  stroke(320, 360, 360);
  point(p1_reverse.x, p1_reverse.y);
  
  
  stroke(0, 360, 360);
  text("p1", p1.x, p1.y);
  stroke(40, 360, 360);
  text("p2", p2.x, p2.y);
  stroke(80, 360, 360);
  text("p3", p3.x, p3.y);
  stroke(120, 360, 360);
  text("p5", p_5.x, p_5.y);
  stroke(160, 360, 360);
  text("p6", p6.x, p6.y);
  stroke(200, 360, 360);
  text("p5_reverse", p_5_reverse.x, p_5_reverse.y);
  stroke(240, 360, 360);
  text("p3_reverse", p3_reverse.x, p3_reverse.y);
  stroke(280, 360, 360);
  text("p2", p2.x, p2.y);
  stroke(320, 360, 360);
  text("p1_reverse", p1_reverse.x, p1_reverse.y);

  
  
//   stroke(255, 0, 0);
//   point(p1.x, p1.y);
//   point(p2.x, p2.y);
//   point(p3.x, p3.y);
//   point(p4.x, p4.y);
//   point(p_5.x, p_5.y);
//   point(p6.x, p6.y);
//   point(p6.x, p6.y);
}



function draw() {
  background(0, 0, 360);
  noFill();
  
  draw_leaf(pts);
  
  noStroke();
  fill(255);
  for (let pt of pts) {
  	ellipse(pt.x, pt.y, 20, 20);
  }
  
  if (mouseIsPressed) {
    for (let pt of pts) {
      if (dist(mouseX, mouseY, pt.x, pt.y) < 20) {
        pt.x = mouseX;
        pt.y = mouseY;
        break;
      }
    }
  }
  
}