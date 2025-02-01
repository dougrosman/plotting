let bDoExportSvg = true;

const crumple = 250;

function setup() {
    // @96dpi
    createCanvas(3.5 * 96, 2 * 96)

    //for (let i = 0; i < 16; i++) {

        if (bDoExportSvg) { beginRecordSVG(this, `doog_skele_crumple${crumple}.svg`); }

        //makePattern();
        makePattern();

        if (bDoExportSvg) { endRecordSVG(); }
    //}
}



function makePattern() {
    strokeWeight(.3)
    stroke(255, 0, 0)
    noFill();
    angleMode(DEGREES)
    rectMode(CENTER)

    push()
    translate(0, -100)
    scale(.25)
    drawConnections();
    drawKeypoints(randomPose);
    pop()

    const num = 100

    // for(let i = 0; i < num; i++) {
    //     const x = map(i, 0, num, 0, width)
    //     const r = map(i, 0, num, 0, 360)
    //     const s = map(sin(r*8+270), -1, 1, 0, 60)
    //     console.log(r)

    //     // push()
    //     //     translate(x, height/2)
    //     //     //rotate(r)
    //     //     rect(0, 0, s, s)
    //     // pop()
    // }
}

function drawConnections() {
    for (let i = 0; i < connections.length; i++) {
        let pointAIndex = connections[i][0]
        let pointBIndex = connections[i][1]
        let pointA = randomPose.keypoints[pointAIndex]
        let pointB = randomPose.keypoints[pointBIndex]
        beginShape(LINES)
        vertex(pointA.x, pointA.y)
        vertex(pointB.x, pointB.y)
        endShape()
    }
}


function drawKeypoints(pose) {
    strokeWeight(1);
    stroke(255, 0, 0);
    fill(255, 0, 0)

    for (let kp of pose.keypoints) {
        circle(kp.x, kp.y, 6)
    }

}


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

let ok = Math.random() * crumple - crumple / 2

let randomPose =
{
    "keypoints": [
        {
            "x": 381 + Math.random() * crumple - crumple / 2,
            "y": 648 + Math.random() * crumple - crumple / 2,
            "name": "Nose"
        },
        {
            "x": 390 + Math.random() * crumple - crumple / 2,
            "y": 633 + Math.random() * crumple - crumple / 2,
            "name": "Left Eye"
        },
        {
            "x": 379 + Math.random() * crumple - crumple / 2,
            "y": 637 + Math.random() * crumple - crumple / 2,
            "name": "Right Eye"
        },
        {
            "x": 418 + Math.random() * crumple - crumple / 2,
            "y": 643 + Math.random() * crumple - crumple / 2,
            "name": "Left Ear"
        },
        {
            "x": 405 + Math.random() * crumple - crumple / 2,
            "y": 645 + Math.random() * crumple - crumple / 2,
            "name": "Right Ear"
        },
        {
            "x": 460 + Math.random() * crumple - crumple / 2,
            "y": 700 + Math.random() * crumple - crumple / 2,
            "name": "Left Shoulder"
        },
        {
            "x": 354 + Math.random() * crumple - crumple / 2,
            "y": 704 + Math.random() * crumple - crumple / 2,
            "name": "Right Shoulder"
        },
        {
            "x": 468 + Math.random() * crumple - crumple / 2,
            "y": 785 + Math.random() * crumple - crumple / 2,
            "name": "Left Elbow"
        },
        {
            "x": 336 + Math.random() * crumple - crumple / 2,
            "y": 777 + Math.random() * crumple - crumple / 2,
            "name": "Right Elbow"
        },
        {
            "x": 459 + Math.random() * crumple - crumple / 2,
            "y": 853 + Math.random() * crumple - crumple / 2,
            "name": "Left Wrist"
        },
        {
            "x": 310 + Math.random() * crumple - crumple / 2,
            "y": 843 + Math.random() * crumple - crumple / 2,
            "name": "Right Wrist"
        },
        {
            "x": 430 + Math.random() * crumple - crumple / 2,
            "y": 845 + Math.random() * crumple - crumple / 2,
            "name": "Left Hip"
        },
        {
            "x": 332 + Math.random() * crumple - crumple / 2,
            "y": 851 + Math.random() * crumple - crumple / 2,
            "name": "Right Hip"
        },
        {
            "x": 419 + Math.random() * crumple - crumple / 2,
            "y": 978 + Math.random() * crumple - crumple / 2,
            "name": "Left Knee"
        },
        {
            "x": 320 + Math.random() * crumple - crumple / 2,
            "y": 974 + Math.random() * crumple - crumple / 2,
            "name": "Right Knee"
        },
        {
            "x": 421 + Math.random() * crumple - crumple / 2,
            "y": 1111 + Math.random() * crumple - crumple / 2,
            "name": "Left Ankle"
        },
        {
            "x": 295 + Math.random() * crumple - crumple / 2,
            "y": 1104 + Math.random() * crumple - crumple / 2,
            "name": "Right Ankle"
        }
    ]
}



let pose =
{
    "keypoints": [
        {
            "x": 381,
            "y": 648,
            "name": "Nose"
        },
        {
            "x": 390,
            "y": 633,
            "name": "Left Eye"
        },
        {
            "x": 379,
            "y": 637,
            "name": "Right Eye"
        },
        {
            "x": 418,
            "y": 643,
            "name": "Left Ear"
        },
        {
            "x": 405,
            "y": 645,
            "name": "Right Ear"
        },
        {
            "x": 460,
            "y": 700,
            "name": "Left Shoulder"
        },
        {
            "x": 354,
            "y": 704,
            "name": "Right Shoulder"
        },
        {
            "x": 468,
            "y": 785,
            "name": "Left Elbow"
        },
        {
            "x": 336,
            "y": 777,
            "name": "Right Elbow"
        },
        {
            "x": 459,
            "y": 853,
            "name": "Left Wrist"
        },
        {
            "x": 310,
            "y": 843,
            "name": "Right Wrist"
        },
        {
            "x": 430,
            "y": 845,
            "name": "Left Hip"
        },
        {
            "x": 332,
            "y": 851,
            "name": "Right Hip"
        },
        {
            "x": 419,
            "y": 978,
            "name": "Left Knee"
        },
        {
            "x": 320,
            "y": 974,
            "name": "Right Knee"
        },
        {
            "x": 421,
            "y": 1111,
            "name": "Left Ankle"
        },
        {
            "x": 295,
            "y": 1104,
            "name": "Right Ankle"
        }
    ]
}