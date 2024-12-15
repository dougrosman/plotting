let vid
let emrysPoses = []
let dougPoses = []
let allPoses = []
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
    })

    dougPoses = loadJSON('doug_keypoints.json', (data) => {
        dougPoses = [...data]
    })

    allPoses.push(emrysPoses, dougPoses)

    console.log(allPoses)

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    //frameRate(5)
}

function draw() {
    background(255);
}

function calculateBoundingBoxes() {
    let lowestX = 10000
    let lowestY = 10000
    let highestX = 0
    let highestY = 0

    // loop as long as all poses from one person
    for (let i = 0; i < allPoses[0].length; i++) {
        let dougPose = dougPoses[i]
        let emrysPose = emrysPoses[i]

        // loop as long as keypoints from one person
        for (let j = 0; j < dougPose.keypoints.length; j++) {
            let dkp = dougPose.keypoints[j]
            let ekp = emrysPose.keypoints[j]

            if (dkp.x < lowestX) {
                lowestX = dkp.x
            }
            if (dkp.y < lowestY) {
                lowestY = dkp.y
            }

            if (ekp.x < lowestX) {
                lowestX = ekp.x
            }
            if (ekp.y < lowestY) {
                lowestY = ekp.y
            }

            if (dkp.x < highestX) {
                highestX = dkp.x
            }
            if (dkp.y < highestY) {
                highestY = dkp.y
            }

            if (ekp.x < highestX) {
                highestX = ekp.x
            }
            if (ekp.y < highestY) {
                highestY = ekp.y
            }
            dougPose.lowestX = lowestX;
            dougPose.lowestY = lowestY;
            emrysPose.width = highestX - lowestX;
            emrysPose.height = highestY - lowestY;
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



async function drawAllPoses() {

    for (poses of allPoses) {

        let translateXAmount = 0;
        for (let i = 0; i < poses.length; i++) {
            let p = poses[i]

            push()
            scale(.4)
            translate(translateXAmount, 0)
            await calculateBoundingBox(allPoses);
            for (kp of p.keypoints) {
                kp.x -= p.lowestX;
                kp.y -= p.lowestY;
            }
            drawConnections(p)
            //drawKeypoints(p);
            pop()
            translateXAmount += p.width
        }
    }
}