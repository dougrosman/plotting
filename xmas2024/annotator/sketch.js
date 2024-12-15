let vid
let videoHTML;
let bodyPose
let poses = []
let connections
let selectedPoint;
let allPoses = [];

function preload() {
    vid = createVideo("video/doug_emrys_acro2.mov", muteVideo)
    vid.hide();
    bodyPose = ml5.bodyPose("MoveNet", options);
    videoHTML = document.querySelector('video')
}

let options = {
    modelType: "MULTIPOSE_LIGHTNING", // "MULTIPOSE_LIGHTNING", "SINGLEPOSE_LIGHTNING", or "SINGLEPOSE_THUNDER".
    enableSmoothing: false,
    minPoseScore: 0.1,
    multiPoseMaxDimension: 512,
    enableTracking: true,
    trackerType: "boundingBox", // "keypoint" or "boundingBox"
    trackerConfig: {},
    modelUrl: undefined,
    flipped: false
  }

function setup() {
    createCanvas(720, 1280)
    vid.size(width, height)
    bodyPose.detectStart(vid, gotPoses)
    connections = bodyPose.getSkeleton()
    colorMode(HSB)
    
}



// Mute the video once it loads.
function muteVideo() {
    vid.volume(0);
    vid.play();
    //vid.loop();
  }

function draw() {
    image(vid, 0, 0)
    push();
    for (let i = 0; i < poses.length; i++ ) {
        let pose = poses[i]
        
        // draw connections
        let h = map(i, 0, poses.length-1, 0, 255)
        fill(h, 30, 70)
        beginShape(LINES)
        
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
    videoHTML.onended = (event) => {
        bodyPose.detectStop();
        console.log(allPoses);
    
        // Convert the array to a JSON string
        const jsonString = JSON.stringify(allPoses, null, 2); // `null, 2` for pretty formatting
    
        // Create a Blob object representing the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });
    
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'allPoses.json'; // Name of the JSON file to save
    
        // Append the link, trigger the download, and remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
}




function gotPoses(results) {
    poses = results
    allPoses.push(poses)
}