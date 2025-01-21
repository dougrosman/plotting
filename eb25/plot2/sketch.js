let vid
let emrysPoses = []
let dougPoses = []
let allPersons = []
let index = 0;

let bDoExportSvg = false;
let yShift = -30;
const connections = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 4],
    [5, 6],
    [5, 7],
    [5, 11],
    [6, 8],
    [6, 12],
    [7, 9],
    [8, 10],
    [11, 12],
    [11, 13],
    [12, 14],
    [13, 15],
    [14, 16]
];


function preload() {
    emrysPoses = loadJSON('emrys_final1_keypoints.json', (data) => {
        emrysPoses = [...data]
        allPersons.push(emrysPoses)
    })

    dougPoses = loadJSON('doug_final1_keypoints.json', (data) => {
        dougPoses = [...data]
        allPersons.push(dougPoses)
    })
}



function setup() {
    // 17x11 @96dpi
    createCanvas(1632, 1056)
    // frameRate(12)
}

function draw() {
    // background(255);
    if (bDoExportSvg) {
        // Begin exporting, if requested
        beginRecordSVG(this, "plotSvg_eb25.svg");
    }

    //line(0, height/2, width, height/2)
    //line(100, height/2 - 175, 100, height/2 + 175)
    //line(0, 2*height/3, width, 2*height/3)

    push();
    translate(0, yShift)
    drawPoses(dougPoses, color(200, 120, 0), 1)
    

    push()
    strokeWeight(2)
    stroke(0, 0, 255)
    circle(400, 20-yShift, 40)
    pop()


    drawPoses(emrysPoses, color(0, 160, 0), 2)
    pop();

    if (bDoExportSvg) {
        // End exporting, if doing so
        endRecordSVG();
        bDoExportSvg = false;
    }
}

function drawPoses(person, _stroke, _rectSpacer) {
    let xPos = 0;
    let yPos = 0;
    let xSpacing = 634;
    let ySpacing = 1400;
    let scaleFactor = .36;
    // xSpacing*=scaleFactor;
    // ySpacing*=scaleFactor;
    let poseSkip = 1;
    let startPose = 0;
    let endPose = 0;
    let selectedPoses = [0, 20, 32, 37, 42, 48, 57,
                        65, 74, 78, 84, 91, 110, 118];

    // draw keypoints
    for (let k = startPose; k < selectedPoses.length - endPose; k += poseSkip) {
        let poseIndex = selectedPoses[k]
        let pose = person[poseIndex]
        push()
        scale(scaleFactor)
        translate(xPos, yPos)
        stroke(_stroke)
        strokeWeight(2)
        for (kp of pose.keypoints) {
            noFill();
            circle(kp.x, kp.y, 12)
        }
        pop();
        xPos += xSpacing
        if(xPos > width/scaleFactor - xSpacing) {
            yPos += ySpacing
            xPos = 0;
        }
    }

    // reset pos
    xPos = 0;
    yPos = 0;
    // circle represents shape before dots are drawn
    push()
    strokeWeight(2)
    stroke(_rectSpacer * 100, 0, 255)
    circle(400 + _rectSpacer * 80, 20-yShift, 40, 40)
    pop()

    // draw connections
    for (let k = startPose; k < selectedPoses.length - endPose; k += poseSkip) {
        let poseIndex = selectedPoses[k]
        let pose = person[poseIndex]
        push()
        scale(scaleFactor)
        translate(xPos, yPos)
        stroke(_stroke)
        strokeWeight(2)
        for (let i = 0; i < connections.length; i++) {
            let pointAIndex = connections[i][0]
            let pointBIndex = connections[i][1]
            let pointA = pose.keypoints[pointAIndex]
            let pointB = pose.keypoints[pointBIndex]
            beginShape(LINES)
            vertex(pointA.x, pointA.y)
            vertex(pointB.x, pointB.y)
            endShape()
        }

        pop();
        xPos += xSpacing

        if(xPos > width/scaleFactor - xSpacing) {
            yPos += ySpacing
            xPos = 0;
        }
    }
}



function drawKeypoints(pose) {
    strokeWeight(6);
    stroke(255, 0, 0);
    beginShape(POINTS)
    for (let kp of pose.keypoints) {
        vertex(kp.x, kp.y)
    }
    endShape()
}

function keyPressed(){
    if (key == 's'){
      // Initiate SVG exporting
      bDoExportSvg = true; 
    }
  }

