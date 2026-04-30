p5.disableFriendlyErrors = true;

let bDoExportSvg = false;

const WIDTH = 12
const HEIGHT = 9
const DPI = 96
const marginX = DPI/3
const marginY = DPI/2

let mySvgFont;

function preload() {
    // mySvgFont = new SvgFont("EMSAllure.svg")
    mySvgFont = new SvgFont("EMSInvite.svg")
}

function setup() {
    // @96dpi
    createCanvas(WIDTH * DPI, HEIGHT * DPI)

        if (bDoExportSvg) { beginRecordSvg(this, `thank-you.svg`); }

        guides();
        makePattern(marginX, height/2);
        makePattern(2*marginX + 5.5*DPI, height/2)

        if (bDoExportSvg) { endRecordSvg(); }
    
}



function makePattern(_x, _y) {
    push()
        translate(_x, _y)
        angleMode(DEGREES)

        const sca = 16
        const xSpacing = sca*3.65
        const ySpacing = sca*5.3
        let xPos = 0
        //let yPos = 0
        const xStart = DPI/2.3
        let yStart = 3*DPI/4
        let petals = [1, 2, 4, 8]

        /// ROW 1
        push()
        translate(-sca/2, 0)
        let numPetals = petals[0]
        flower("T", xStart + (xPos), yStart, numPetals, sca)
        flower("H", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("A", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("N", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("K", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos+=xSpacing/2

        flower("Y", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("O", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("U", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        pop()

        xPos = 0;
        yStart+=(3*ySpacing/4)

        /// ROW 2
        numPetals = petals[1]
        flower("T", xStart + (xPos), yStart, numPetals, sca)
        flower("H", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("A", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("N", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("K", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos+=xSpacing/2

        flower("Y", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("O", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("U", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos = 0;
        yStart+=ySpacing

         /// ROW 3
         numPetals = petals[2]
        flower("T", xStart + (xPos), yStart, numPetals, sca)
        flower("H", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("A", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("N", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("K", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos+=xSpacing/2

        flower("Y", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("O", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("U", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos = 0;
        yStart+=ySpacing

         /// ROW 4
         numPetals = petals[3]
        flower("T", xStart + (xPos), yStart, numPetals, sca)
        flower("H", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("A", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("N", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("K", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos+=xSpacing/2

        flower("Y", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("O", xStart + (xPos+=xSpacing), yStart, numPetals, sca)
        flower("U", xStart + (xPos+=xSpacing), yStart, numPetals, sca)

        xPos = 0;
        yStart+=ySpacing


        // flower("T", DPI * 5.5/2, DPI/2, 2, 20)
        // flower("T", DPI * 5.5/2, DPI * 4/2, 4, 20)
        // flower("T", DPI * 5.5/2, DPI * 4/2, 8, 20)


        // flower("T", DPI * 5.5/2, DPI * 4/2, 8, 20)

        
    pop()
}

function flower(_char, _x, _y, numPetals, fontScale) {
    push()
        translate(_x, _y)
        
        for(let i = 0; i < 360; i+=360/numPetals) {
            push()
                rotate(i)
                mySvgFont.drawString(_char, 0, 0, fontScale)
            pop()
        }
    pop()
}

function guides() {
    

    rect(marginX, marginY, 5.5*DPI, 8*DPI)
    rect(2*marginX + 5.5*DPI, marginY, 5.5*DPI, 8*DPI)

    line(marginX, height/2, marginX + 5.5*DPI, height/2)
    line(2*marginX + 5.5*DPI, height/2, 2*marginX + 2 * 5.5*DPI, height/2)
}

