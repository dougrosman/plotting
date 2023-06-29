let pdf;

let anchors = [];

const NUM_ANCHORS = 3;


function setup() {
    // If we use SVG Renderer, then the PDF generated will be vector
    // Note that to use SVG Renderer, you must include p5.svg library
    createCanvas(792, 612, SVG);
    //frameRate(30);
    // createCanvas(3300, 2550, SVG);
    pdf = createPDF();
    pdf.beginRecord();

    for(let i = 0; i < NUM_ANCHORS; i++) {
        anchors.push(new Anchor());
    }

    strokeWeight(0.01);
}

function draw() {
    // background(255);
    
    for(let i = 0; i < anchors.length; i++) {

        if(i == anchors.length - 1) {
            line(anchors[i].pos.x, anchors[i].pos.y, anchors[0].pos.x, anchors[0].pos.y);
        } else {
            line(anchors[i].pos.x, anchors[i].pos.y, anchors[i+1].pos.x, anchors[i+1].pos.y);
        }

        anchors[i].move();
    }
    
    if (frameCount == 120) {
        noLoop();
        pdf.save();
    }
}

class Anchor {
    constructor() {
        this.startingPos = createVector(random(width/4, 3*width/4), random(height/4, 3*height/4));
        this.pos = createVector(this.startingPos.x, this.startingPos.y);
        this.rate = floor(random(10, 50));
        this.range = floor(random(height/4));
    }

    move() {
        const x = map(sin(frameCount/this.rate), -1, 1,  this.startingPos.x - this.range, this.startingPos.x + this.range);
        const y = map(sin(frameCount/this.rate), -1, 1,  this.startingPos.y - this.range, this.startingPos.y + this.range);

        this.pos = createVector(x, y);
    }
}