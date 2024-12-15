let img
let bodyPose
let poses = []
let connections
let selectedPoint;

function preload() {
    img = loadImage("images/doug_emrys_pocket.JPG")
    bodyPose = ml5.bodyPose("MoveNet");
}

function setup() {
    createCanvas(720, 1008)
    img.resize(width, height)
    bodyPose.detect(img, gotPoses)
    connections = bodyPose.getSkeleton()
    colorMode(HSB)
}

function draw() {

    if(keyIsPressed) {
        if(key === " ") {
            image(img, 0, 0, width, height)
        }
    } else {
        clear();
    }
    //image(img, 0, 0, width, height)
    
    push();
    for (let i = 0; i < poses.length; i++ ) {
        let pose = poses[i]
        
        // draw connections
        let h = map(i, 0, poses.length-1, 0, 255)
        fill(h, 30, 70)
        beginShape(TRIANGLE_STRIP)
        
        for(let j = 0; j < connections.length; j++) {
            strokeWeight(2)
            stroke(h, 100, 60)
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
            strokeWeight(12)
            fill(h, 100, 60)
            stroke(h, 100, 60)
            point(kp.x, kp.y)
        }
    }
}

function mousePressed() {
    for(let i = 0; i < poses.length; i++) {
        let pose = poses[i]
        for(let j = 0; j < pose.keypoints.length; j++) {
            let keypoint = pose.keypoints[j]
            let keypointX = keypoint.x
            let keypointY = keypoint.y
            

            if(dist(mouseX, mouseY, keypointX, keypointY) < 10) {
                selectedPoint = keypoint;
            }
        }
    }
}

function mouseDragged() {
    selectedPoint.x = mouseX;
    selectedPoint.y = mouseY;
}

function mouseReleased() {
    selectedPoint = ""
}


function gotPoses(results) {
    poses = results
    
}