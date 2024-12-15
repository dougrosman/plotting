let vid
let allPoses = []
let index = 0;


function preload() {
    // vid = createVideo("video/doug_emrys_acro2.mov", muteVideo)
    // vid.hide();
    allPoses = loadJSON('allPoses.json', (data) => {
        allPoses = [...data]
    })

}

function setup() {
    createCanvas(720, 1280)
    console.log(allPoses)
}

function draw() {
    background(255);
    index = frameCount % allPoses.length;

    const ap = allPoses[index];

    for (let p of ap) {
        strokeWeight(10);
        stroke(0);
        beginShape(POINTS)
        for (let kp of p.keypoints) {

            vertex(kp.x, kp.y)

        }
        endShape()
    }
}