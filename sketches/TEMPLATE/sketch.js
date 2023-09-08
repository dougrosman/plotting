let pdf;

function setup() {
    createCanvas(792 * (4/3), 612 * (4/3), SVG);
   

    pdf = createPDF();
    pdf.beginRecord();

    
    // draw stuff

    pdf.save();
}

function draw() {
    
}