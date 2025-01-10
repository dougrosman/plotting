let vid
let emrysPoses = []
let dougPoses = []
let allPersons = []
let index = 0;
let selectedPoses = [];
let bDoExportSvg = false;
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
    createCanvas(1700, 1100)
    // frameRate(12)
}

function draw() {
    // background(255);
    if (bDoExportSvg) {
        // Begin exporting, if requested
        beginRecordSVG(this, "plotSvg_hello_animating.svg");
    }
    drawPoses(dougPoses)
    drawPoses(emrysPoses)
    if (bDoExportSvg) {
        // End exporting, if doing so
        endRecordSVG();
        bDoExportSvg = false;
    }

    
}

function drawPoses(person) {
    let xTrans = 0;
    let yStep = 720;


    for (let k = 0; k < person.length; k += 4) {

        //for (pose of person) {
        let pose = person[k]
        push()
        scale(1.25)
        translate(300, -350)
        stroke(0)
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

        // for (kp of pose.keypoints) {
        //     noFill();
        //     circle(kp.x, kp.y, 10)
        // }

        pop();
        xTrans += yStep
        //  }
        xTrans = 0;
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

function drawConnections(persons) {

    let xTrans = 0;
    let yStep = 720;


    for (person of persons) {
        //for (pose of person) {
        let pose = person[index]
        push()
        scale(1)
        translate(xTrans, 0)
        stroke(0)
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

        beginShape(POINTS)
        strokeWeight(10)
        for (kp of pose.keypoints) {
            vertex(kp.x, kp.y)
        }
        endShape()

        pop();
        xTrans += yStep
        //  }
        xTrans = 0;
    }

}

function keyPressed(){
    if (key == 's'){
      // Initiate SVG exporting
      bDoExportSvg = true; 
    }
  }

