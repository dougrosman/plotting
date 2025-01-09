let vid
let allPoses = []
let index = 0;
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
    // vid = createVideo("video/doug_emrys_acro2.mov", muteVideo)
    // vid.hide();
    allPoses = loadJSON('emrys_keypoints.json', (data) => {
        allPoses = [...data]
    })

}

function setup() {
    createCanvas(880, 1280)
    console.log(allPoses)
    frameRate(5)
}

function draw() {
    background(255);
    index = floor(frameCount % allPoses.length);
    let pose = allPoses[index]

    drawConnections(pose)
    drawKeypoints(pose);

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

function drawConnections(pose) {
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
}