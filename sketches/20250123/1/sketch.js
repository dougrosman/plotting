let bDoExportSvg = false;
let x = 0;
let startS = 200
let s = startS
let sRate = .125

function setup() {
    // @96dpi
    createCanvas(12*96, 9*96)
    angleMode(DEGREES)

    rectMode(CENTER)
    if (bDoExportSvg) {
        // Begin exporting, if requested
        beginRecordSVG(this, "plotSvg_2025.01.23.svg");
    }
    strokeWeight(.25)
    noFill();
    

    // if(s > 0 && x < width - 6*startS/4) {
    for(let i = 0; i < 480; i++) {

        let h = map(sin(i*1.4), -1, 1, height/4, 3*height/4, true)
        s = map(sin((i*3)-90), -1, 1, 1, startS, true)
        //const rectRound = map(sin(i/3), -1, 1, s/16, s/2, true)
        circle(x+36, h, s)
        x+=2
    }

    if (bDoExportSvg) {
        // End exporting, if doing so
        endRecordSVG();
        bDoExportSvg = false;
    }
}

// function draw() {

//     if (bDoExportSvg) {
//         // Begin exporting, if requested
//         beginRecordSVG(this, "plotSvg_2025.01.23.svg");
//     }
    
//     strokeWeight(.25)
//     noFill();

//     if(s > 0 && x < width - 6*startS/4) {

//         s = map(sin(frameCount/100), -1, 1, 10, startS)
//         const rectRound = map(sin(frameCount/10), -1, 1, 10, s/2, true)
//         rect(3*startS/4 + x, height/2, s, s, rectRound)
//         x+=dx
//         // s-=sRate;
//     }

    
   
//     if (bDoExportSvg) {
//         // End exporting, if doing so
//         endRecordSVG();
//         bDoExportSvg = false;
//         noLoop()
//     }
// }



function keyPressed(){
    if (key == 's'){
      // Initiate SVG exporting
      bDoExportSvg = true; 
    }
  }

