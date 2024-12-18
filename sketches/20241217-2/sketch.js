let pdf;

function setup() {
    createCanvas(1200, 900, SVG);
   

    // pdf = createPDF();
    // pdf.beginRecord();

    
    rectMode(CENTER)
    thingToPlot();

   // pdf.save();
}

function draw() {

}

function thingToPlot() {
    //const stepSize = width/256
    const stepSize = 0.01
    
    strokeWeight(2)
    
    for(let i = stepSize*4; i < 10; i+=stepSize) {
        push()
        let x = map(cos(i/random(0.1, 1)), -1, 1, width/8, 7*width/8)
        let y = map(sin(i/random(0.1, 20)), -1, 1, height/8, 7*height/8)

        translate(x, y)
        rotate(map(sin(i), -1, 1, 0, TWO_PI*4))
        rect(0, 0, floor(random(4, 16)))
        pop();
    }
}


class Particle {

    constructor(){
        this.pos = createVector(width/2, 7*height/8)
        this.vel = 
    }
}