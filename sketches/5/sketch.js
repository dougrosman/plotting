let pdf;
let savePDF = false;


function setup() {
  createCanvas(1632, 1056, SVG);
  rectMode(CENTER);
  noFill();

  if (savePDF) {
    pdf = createPDF();
    pdf.beginRecord();
  }




  if (savePDF) { pdf.save(); }
}

function draw() {

  background(255);


  push()
  translate(width / 2, height / 2)
  drawLeafCurveVertex()
  pop()

  push()
  translate(width / 4, height / 4)
  drawLeafBezierCurve()
  pop()



}

function drawLeafBezierCurve() {
  strokeWeight(4);
  point(0, 0);
  point(75, 25);
  point(100, 100);
  point(25, 75);

 
beginShape();
vertex(30, 20);
bezierVertex(80, 0, 80, 75, 30, 75);
endShape();
}

function drawLeafCurveVertex() {
  strokeWeight(4);
  // point(0, 0);
  // point(75, 25);
  // point(100, 100);
  // point(25, 75);
  strokeWeight(1);
  beginShape();
  curveVertex(0, 0);
  curveVertex(0, 0);
  curveVertex(75, 25);
  curveVertex(100, 100);
  curveVertex(25, 75);
  curveVertex(0, 0);
  curveVertex(0, 0);
  endShape();
}