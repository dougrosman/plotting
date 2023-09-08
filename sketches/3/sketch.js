let pdf;

function setup() {
    createCanvas(792 * (4 / 3), 612 * (4 / 3), SVG);
    angleMode(DEGREES);

    // pdf = createPDF();
    // pdf.beginRecord();


    // draw stuff

    // pdf.save();
}

function draw() {
    let x = sin(frameCount) * frameCount / 9
    let y = cos(frameCount * .5) * frameCount / 12;

    strokeWeight(.5);
    push();
    translate(width / 2, height / 2);
    rotate(frameCount/12.2);
    line(x, y, 0, 0);

    // stroke(0);
    // rotate(90);
    // line(x, y, 0, 0);
    //ellipse(x, y, 4, 4);
    pop();
}