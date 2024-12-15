let img
let bodyPose
let poses = []
let connections

function preload() {
    img = loadImage("images/doug_emrys_pocket.JPG")
    bodyPose = ml5.bodyPose("MoveNet");
}

function setup() {
    createCanvas(720, 1008)

    bodyPose.detect(img, gotPoses)
    connections = bodyPose.getSkeleton()
}

function draw() {

    if(keyIsPressed) {
        if(key === " ") {
            image(img, 0, 0, width, height)
        }
    } else {
        clear();
    }
    
    push();
    scale(width / img.width);
    for (let i = 0; i < poses.length; i++ ) {
        let pose = poses[i]
        
        // draw connections
        beginShape(LINES)
        for(let j = 0; j < connections.length; j++) {
            strokeWeight(2)
            stroke(0)
            let pointAIndex = connections[j][0]
            let pointBIndex = connections[j][1]

            let pointA = pose.keypoints[pointAIndex]
            let pointB = pose.keypoints[pointBIndex]
     

            vertex(pointA.x, pointA.y)
            vertex(pointB.x, pointB.y)
        }
        endShape()

        // draw keypoints
        for (kp of pose.keypoints) {
            strokeWeight(10)
            fill(0, 255, 0)
            stroke(0, 255, 0)
            //point(kp.x, kp.y)
        }
    }
}



function gotPoses(results) {
    poses = results
    
}