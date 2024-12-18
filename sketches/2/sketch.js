let pdf;

let anchorPair1;
let anchorPair2;
let anchorPair3;

let anchorPairs = [];



function setup() {
    createCanvas(792 * (4/3), 612 * (4/3), SVG);
    anchorPair1 = new AnchorPair();
    anchorPair2 = new AnchorPair();
    anchorPair3 = new AnchorPair();
    stroke(255, 0, 255);
    strokeWeight(0.25);

    // pdf = createPDF();
    // pdf.beginRecord();

    
    beginShape()
    for(let i = 0; i < 1500; i++) {

        anchorPair1.move(i);
        anchorPair2.move(i);
        anchorPair3.move(i);

        const drawingLerper1 = p5.Vector.lerp(anchorPair1.lerper, anchorPair2.lerper, map(sin(i/(TWO_PI)), -1, 1, 0, 1));
        vertex(drawingLerper1.x, drawingLerper1.y);

        const drawingLerper2 = p5.Vector.lerp(anchorPair2.lerper, anchorPair3.lerper, map(sin(i/(TWO_PI)), -1, 1, 0, 1));
        vertex(drawingLerper2.x, drawingLerper2.y);

        const drawingLerper3 = p5.Vector.lerp(anchorPair1.lerper, anchorPair3.lerper, map(sin(i/(TWO_PI)), -1, 1, 0, 1));
        vertex(drawingLerper3.x, drawingLerper3.y);
    }

    endShape()

    // pdf.save();
}

function draw() {

    if (frameCount > 1) {
        // anchorPair1.move(frameCount);
        // anchorPair2.move(frameCount);

        //// ANCHORS

        // STYLING (POINTS)
        // strokeWeight(10);
        // stroke(255, 0, 0);

        // ANCHOR PAIR 1
        //point(anchorPair1.anchor1Pos.x, anchorPair1.anchor1Pos.y);
        //point(anchorPair1.anchor2Pos.x, anchorPair1.anchor2Pos.y);
        
        // ANCHOR PAIR 2
        //point(anchorPair2.anchor1Pos.x, anchorPair2.anchor1Pos.y);
        //point(anchorPair2.anchor2Pos.x, anchorPair2.anchor2Pos.y);
        
        // STYLING (LINES)
        // strokeWeight(1);
        // stroke(0);

        // CONNECTING LINES
        // line(anchorPair1.anchor1Pos.x, anchorPair1.anchor1Pos.y, anchorPair1.anchor2Pos.x, anchorPair1.anchor2Pos.y);
        // line(anchorPair2.anchor1Pos.x, anchorPair2.anchor1Pos.y, anchorPair2.anchor2Pos.x, anchorPair2.anchor2Pos.y);
        
        //// ANCHOR LERPERS

        // LERPER POINTS
        // strokeWeight(10);
        // stroke(0, 255, 255);
        // point(anchorPair1.lerper.x, anchorPair1.lerper.y);
        // point(anchorPair2.lerper.x, anchorPair2.lerper.y);

        //// DRAWING LERPER

        // CONNECTING LINE
        // strokeWeight(1);
        // stroke(0);
        // line(anchorPair1.lerper.x, anchorPair1.lerper.y,anchorPair2.lerper.x, anchorPair2.lerper.y)

        // LERPER
        // const drawingLerper = p5.Vector.lerp(anchorPair1.lerper, anchorPair2.lerper, map(sin(frameCount/TWO_PI), -1, 1, 0, 1));

        // stroke(255, 0, 255);
        // strokeWeight(2);
        // point(drawingLerper.x, drawingLerper.y);


    }
}

class AnchorPair {
    constructor() {
        this.anchor1Start = createVector(random(width / 16, 15 * width / 16), random(height / 16, 15 * height / 16));
        this.anchor2Start = createVector(random(width / 16, 15 * width / 16), random(height / 16, 15 * height / 16));
        this.anchor1Pos = createVector(this.anchor1Start.x, this.anchor1Start.y);
        this.anchor2Pos = createVector(this.anchor2Start.x, this.anchor2Start.y);
        this.density = 3;
        this.range = floor(random(height));
        this.lerper = p5.Vector.lerp(this.anchor1Pos, this.anchor2Pos, 0);
    }

    move(d) {
        this.lerper = p5.Vector.lerp(this.anchor1Pos, this.anchor2Pos, map(sin(d / (TWO_PI * this.density)), -1, 1, 0, 1));
    }
}