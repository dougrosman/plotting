let vid
let emrysPoses = []
let dougPoses = []
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
    emrysPoses = loadJSON('emrys_keypoints.json', (data) => {
        emrysPoses = [...data]
    })

    dougPoses = loadJSON('doug_keypoints.json', (data) => {
        dougPoses = [...data]
    })

}

function setup() {
    createCanvas(windowWidth, windowHeight)
    console.log(dougPoses)
    frameRate(5)
}

function draw() {
    background(255);
    index = floor(frameCount % emrysPoses.length);
    let pose = emrysPoses[index]

    drawEmrysPoses();

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

function drawBoundingBox(pose) {
    let lowestX = 10000
    let lowestY = 10000
    let highestX = 0
    let highestY = 0

    for(let kp of pose.keypoints) {
        if(kp.x < lowestX) {
            lowestX = kp.x
        }
        if(kp.y < lowestY) {
            lowestY = kp.y
        }
    }

    for(let kp of pose.keypoints) {
        if(kp.x > highestX) {
            highestX = kp.x
        }
        if(kp.y > highestY) {
            highestY = kp.y
        }
    }
    noFill();
    stroke(0, 0, 255)
    strokeWeight(2)

    //rect(lowestX, lowestY, highestX - lowestX, highestY - lowestY)

    pose.lowestX = lowestX;
    pose.lowestY = lowestY;
    pose.width = highestX - lowestX;
    pose.height = highestY - lowestY;

}

async function drawEmrysPoses() {

    let translateXAmount = 0;
    for(let i = 0; i < emrysPoses.length; i++) {
       let p = emrysPoses[i]

       push()
       scale(.4)
       translate(translateXAmount, 0)
        await drawBoundingBox(p);
        for(kp of p.keypoints) {
            kp.x-=p.lowestX;
            kp.y-=p.lowestY;
        }
        drawConnections(p)
        //drawKeypoints(p);
        pop()
       translateXAmount+=p.width
    }
}