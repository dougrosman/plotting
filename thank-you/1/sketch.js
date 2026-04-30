p5.disableFriendlyErrors = true;

let bDoExportSvg = false;

const WIDTH = 12
const HEIGHT = 9
const DPI = 96

let mySvgFont;

function preload() {
    // mySvgFont = new SvgFont("EMSAllure.svg")
    mySvgFont = new SvgFont("EMSInvite.svg")
}

function setup() {
    // @96dpi
    createCanvas(WIDTH * DPI, HEIGHT * DPI)

        if (bDoExportSvg) { beginRecordSVG(this, `doog_skele_crumple${crumple}.svg`); }

        guides();
        makePattern();

        if (bDoExportSvg) { endRecordSVG(); }
    
}



function makePattern(x, y) {
    push()
    translate(x, y)
    mySvgFont.drawString("Thank you", 100, 100, 100)
    pop()
}

function guides() {
    const marginX = DPI/3
    const marginY = DPI/2

    rect(marginX, marginY, 5.5*DPI, 8*DPI)
    rect(2*marginX + 5.5*DPI, marginY, 5.5*DPI, 8*DPI)

    line(marginX, height/2, marginX + 5.5*DPI, height/2)
    line(2*marginX + 5.5*DPI, height/2, 2*marginX + 2 * 5.5*DPI, height/2)
}

