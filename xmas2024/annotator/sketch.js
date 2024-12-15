let images = [];
    let currentFrame = 0;
    const frameCount = 136; // Total number of frames
    const keypointsList = [
      "Nose", "Left Eye", "Right Eye", "Left Ear", "Right Ear",
      "Left Shoulder", "Right Shoulder", "Left Elbow", "Right Elbow",
      "Left Wrist", "Right Wrist", "Left Hip", "Right Hip",
      "Left Knee", "Right Knee", "Left Ankle", "Right Ankle"
    ];
    let currentKeypointIndex = 0;
    let allFrames = [];
    let currentKeypoints = [];

    function preload() {
      for (let i = 1; i <= frameCount; i++) {
        let framePath = `frames/frame_${String(i).padStart(4, '0')}.jpg`;
        images.push(loadImage(framePath));
      }
    }

    function setup() {
      let canvas = createCanvas(800, 1280);
      canvas.parent("canvas-container");
      displayFrame();
    }

    function draw() {
        displayFrame();
        currentKeypoints.forEach(keypoint => {
          fill(255, 0, 0);
          noStroke();
          ellipse(keypoint.x, keypoint.y, 6, 6);
        });
      }
  
      function displayFrame() {
        background(255);
        if (images[currentFrame]) {
          image(images[currentFrame], 40, 0);
        }
        updatePreview();
        drawCurrentKeypointLabel();
      }
  
      function drawCurrentKeypointLabel() {
        fill(0);
        textSize(16);
        text(`Annotating: ${keypointsList[currentKeypointIndex]}`, 10, height - 20);
      }
  
      function mousePressed() {
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
          let keypoint = {
            x: mouseX,
            y: mouseY,
            name: keypointsList[currentKeypointIndex]
          };
          currentKeypoints.push(keypoint);
          currentKeypointIndex++;
  
          if (currentKeypointIndex >= keypointsList.length) {
            allFrames.push({ keypoints: currentKeypoints });
            currentKeypoints = [];
            currentKeypointIndex = 0;
            currentFrame++;
            if (currentFrame >= frameCount) {
              currentFrame = frameCount - 1; // Stop at the last frame
            }
            displayFrame();
          } else {
            drawCurrentKeypointLabel();
          }
          updatePreview();
        }
      }
  
      function updatePreview() {
        document.getElementById("jsonPreview").textContent = JSON.stringify(allFrames, null, 2);
      }
  
      function keyPressed() {
        if (keyCode === RETURN) {
          let personName = document.getElementById("personName").value.trim();
          if (!personName) {
            alert("Please enter a person name before saving.");
            return;
          }
          saveJSON(allFrames, `${personName}_keypoints.json`);
        }
      }