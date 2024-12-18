let pdf;

function setup() {
    createCanvas(1200, 900, SVG);
   

    // pdf = createPDF();
    // pdf.beginRecord();

    
    thingToPlot();

   // pdf.save();
}

function thingToPlot() {
    const numLines = 20
    const stepSize = width/32
    let startX = width/2
    let startY = height/2
    let prevRandNum = 5;
    strokeWeight(4)
    beginShape()
    for(let i = 0; i < numLines; i++) {


        let randNum = floor(random(4))

        while(randNum == prevRandNum) {
            randNum = floor(random(4))
        }

        switch (randNum) {
            case 0:
                startX+=stepSize
                break;
            case 1:
                startY+=stepSize
                break;
            case 2:
                startX-=stepSize
                break;
            case 3:
                startY-=stepSize
                break;
        }
        vertex(startX, startY)
        prevRandNum = randNum
    }
    endShape()
}