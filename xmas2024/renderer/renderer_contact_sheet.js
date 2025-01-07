let vid
let emrysPoses = []
let dougPoses = []
let allPersons = []
let index = 0;
let globalLowestX = 10000
let globalLowestY = 10000
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
    emrysPoses = loadJSON('emrys_keypoints.json', (data) => {
        emrysPoses = [...data]
        allPersons.push(emrysPoses)
    })

    dougPoses = loadJSON('doug_keypoints.json', (data) => {
        dougPoses = [...data]
        allPersons.push(dougPoses)
    })
}

function setup() {
    createCanvas(3400, 2200)
}

function draw() {
    background(255);
    drawConnections(allPersons);
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

    let yTrans = 0;
    let yStep = 500;

    
    for (person of persons) {
        for (pose of person) {
            push()
            translate(yTrans, 0)
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
            for(kp of pose.keypoints) {
                vertex(kp.x, kp.y)
            }
            endShape()


            pop();  
            yTrans+=yStep
        }
       yTrans = 0;
    }
    
}