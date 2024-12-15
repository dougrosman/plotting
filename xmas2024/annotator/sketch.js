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

    let startTime = 0;
    let frameTimes = [];
    let shortestTime = Infinity;
    let keypointCooldown = false;

    function preload() {
      for (let i = 1; i <= frameCount; i++) {
        let framePath = `frames/frame_${String(i).padStart(4, '0')}.jpg`;
        images.push(loadImage(framePath));
      }
      soundFormats('ogg', 'mp3');
      popSound = loadSound('sounds/pop.ogg');
      greatJobSound = loadSound('sounds/great_job.mp3');
      newRecordSound = loadSound('sounds/new_record.mp3');
      congratsSound = loadSound('sounds/congratulations.mp3');
      bgMusic = loadSound('sounds/wii_shop_music.mp3');
    }

    function setup() {
      let canvas = createCanvas(880, 1280);
      canvas.parent("canvas-container");
      displayFrame();
      bgMusic.loop();
    }

    function draw() {
      displayFrame();
      currentKeypoints.forEach(keypoint => {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.x, keypoint.y, 6, 6);
      });
      updateElapsedTime();
    }

    function displayFrame() {
      background(255);
      if (images[currentFrame]) {
        image(images[currentFrame], 80, 0);
      }
      drawCurrentKeypointLabel();
      updatePreview();
    }

    function drawCurrentKeypointLabel() {
      fill(255);
      stroke(0)
      strokeWeight(1)
      textSize(16);
      text(`${keypointsList[currentKeypointIndex]}`, mouseX, mouseY);
      fill(0, 255, 0)
      noStroke()
      ellipse(mouseX, mouseY, 6, 6)
    }

    function mousePressed() {
      if (!keypointCooldown && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        let keypoint = {
          x: mouseX,
          y: mouseY,
          name: keypointsList[currentKeypointIndex]
        };
        currentKeypoints.push(keypoint);
        currentKeypointIndex++;
        popSound.play();
        updatePreview();

        keypointCooldown = true;
        setTimeout(() => {
          keypointCooldown = false;
        }, 300);

        if (currentKeypointIndex >= keypointsList.length) {
          completeFrame();
        } else {
          drawCurrentKeypointLabel();
        }
      }
    }

    function completeFrame() {
      allFrames.push({ keypoints: currentKeypoints });
      currentKeypoints = [];
      currentKeypointIndex = 0;
      let timeTaken = millis() - startTime;
      frameTimes.push(timeTaken / 1000);

      if (timeTaken < shortestTime) {
        shortestTime = timeTaken;
        newRecordSound.play();
      } else {
        greatJobSound.play();
      }

      if (currentFrame === frameCount - 1) {
        congratsSound.play();
      } else {
        bgMusic.rate(bgMusic.rate() + 0.02);
      }

      updateStats();
      saveProgress();

      currentFrame++;
      if (currentFrame >= frameCount) {
        currentFrame = frameCount - 1; // Stop at the last frame
      }
      displayFrame();
      startTime = millis();
    }

    function updateElapsedTime() {
      let elapsed = ((millis() - startTime) / 1000).toFixed(1);
      document.getElementById("elapsedTime").textContent = `Elapsed Time: ${elapsed}s`;
    }

    function updateStats() {
      let avgTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      let estTime = avgTime * (frameCount - currentFrame);

      document.getElementById("currentFrame").textContent = `Current Frame: ${currentFrame + 1}`;
      document.getElementById("shortestTime").textContent = `Shortest Time: ${(shortestTime / 1000).toFixed(1)}s`;
      document.getElementById("averageTime").textContent = `Average Time: ${avgTime.toFixed(1)}s`;
      document.getElementById("estimatedTime").textContent = `Estimated Completion Time: ${estTime.toFixed(1)}s`;

      let frameTimesList = document.getElementById("frameTimes");
      frameTimesList.innerHTML = "";
      frameTimes.forEach((time, index) => {
        let li = document.createElement("li");
        li.textContent = `Frame ${index + 1}: ${time.toFixed(1)}s`;
        frameTimesList.appendChild(li);
      });
    }

    function updatePreview() {
      document.getElementById("jsonPreview").textContent = JSON.stringify(allFrames.concat({ keypoints: currentKeypoints }), null, 2);
    }

    function saveProgress() {
      localStorage.setItem("currentFrame", currentFrame);
      localStorage.setItem("allFrames", JSON.stringify(allFrames));
    }

    function loadProgress() {
      let savedFrame = localStorage.getItem("currentFrame");
      let savedData = localStorage.getItem("allFrames");
      if (savedFrame) {
        currentFrame = parseInt(savedFrame);
      }
      if (savedData) {
        allFrames = JSON.parse(savedData);
      }
    }

    document.getElementById("resetButton").addEventListener("click", () => {
      localStorage.clear();
      currentFrame = 0;
      allFrames = [];
      frameTimes = [];
      shortestTime = Infinity;
      updateStats();
      displayFrame();
    });

    window.onload = loadProgress;

    function keyPressed() {
      if (keyCode === ENTER || keyCode === RETURN) {
        let personName = document.getElementById("personName").value.trim();
        if (!personName) {
          alert("Please enter a person name before saving.");
          return;
        }
        saveJSON(allFrames, `${personName}_keypoints.json`);
      }
    }