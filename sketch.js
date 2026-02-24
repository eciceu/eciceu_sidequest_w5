/*
Week 5 — Meditative Camera Experience (Option C) + Bonus Auto-Discover
Option B: Minimal control (Left/Right) while camera still gently auto-drifts.

Controls:
- LEFT / RIGHT: gently nudge the camera
- R: restart
- +/-: change base drift speed
*/

const VIEW_W = 800;
const VIEW_H = 480;

const WORLD_W = 3000;

let camX = 0;

// pacing
let baseSpeed = 1.0;
let breatheAmp = 0.6;
let breatheRate = 0.012;

// minimal control
let nudgeSpeed = 1.2; // how much arrow keys push camera
let blobLean = 0; // visual feedback for input
let blobFloatT = 0;

// discoverables
let symbols = [];
let toast = "";
let toastTimer = 0;

// state + UI
let state = "start";
let startBtn;

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  textFont("sans-serif");

  startBtn = createButton("Start");
  startBtn.size(160, 44);
  startBtn.mousePressed(() => startExperience());

  positionStartButton();
  initWorld();
}

function windowResized() {
  positionStartButton();
}

function positionStartButton() {
  const cx = (windowWidth - VIEW_W) / 2;
  const cy = (windowHeight - VIEW_H) / 2;
  startBtn.position(max(10, cx + VIEW_W / 2 - 80), max(10, cy + VIEW_H * 0.72));
}

function initWorld() {
  camX = 0;
  blobFloatT = 0;
  blobLean = 0;

  symbols = [
    { x: 520, y: 170, r: 14, found: false, text: "breathe in" },
    { x: 1240, y: 260, r: 14, found: false, text: "slow down" },
    { x: 2100, y: 150, r: 14, found: false, text: "you’re here" },
  ];

  toast = "";
  toastTimer = 0;
}

function startExperience() {
  initWorld();
  state = "play";
  startBtn.hide();
}

function draw() {
  if (state === "start") {
    drawStartScreen();
    return;
  }

  // --- camera auto-drift pacing ---
  const breathe = sin(frameCount * breatheRate) * breatheAmp;
  const autoSpeed = max(0.25, baseSpeed + breathe);

  camX += autoSpeed;

  // --- minimal player control: nudge camera left/right ---
  let input = 0;
  if (keyIsDown(LEFT_ARROW)) input -= 1;
  if (keyIsDown(RIGHT_ARROW)) input += 1;

  camX += input * nudgeSpeed;

  // clamp to world
  camX = constrain(camX, 0, WORLD_W - width);

  // blob “leans” a little with input (feedback without turning it into a game)
  blobLean = lerp(blobLean, input * 14, 0.12);

  // blob anchored near center with float
  blobFloatT += 0.01;
  const blobX = camX + width * 0.5 + blobLean;
  const blobY = 300 + sin(blobFloatT * 2.0) * 6;

  // --- bonus: auto-discover symbols ---
  const camCenterX = camX + width / 2;
  const camCenterY = height / 2;

  for (const s of symbols) {
    if (s.found) continue;
    const d = dist(camCenterX, camCenterY, s.x, s.y);
    if (d < 140) {
      s.found = true;
      toast = s.text;
      toastTimer = 120;
    }
  }

  // --- draw world ---
  background(245);

  push();
  translate(-camX, 0);

  drawBackdrop();
  drawGround();
  drawAtmosphere();
  drawSymbols(camCenterX);
  drawBlob(blobX, blobY);

  pop();

  drawHUD(autoSpeed);

  if (toastTimer > 0) toastTimer--;
  if (toastTimer === 0) toast = "";
}

function drawStartScreen() {
  background(245);

  // calm gradient
  noStroke();
  for (let y = 0; y < height; y += 6) {
    const t = y / height;
    fill(240 - t * 30, 240 - t * 25, 240 - t * 20, 255);
    rect(0, y, width, 6);
  }

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(32);
  text("Camera Drift", width / 2, height * 0.22);

  textSize(16);
  text("A short meditative scrolling experience.", width / 2, height * 0.31);

  textSize(14);
  text(
    "The camera gently moves forward through a world larger than the screen.\n" +
      "Use LEFT/RIGHT to softly guide the drift.\n" +
      "Glowing symbols reveal messages as you pass near them.\n\n" +
      "Controls:\n" +
      "LEFT/RIGHT = drift\n" +
      "R = restart   + / - = adjust speed",
    width / 2,
    height * 0.5,
  );

  startBtn.show();
  positionStartButton();

  textAlign(LEFT, BASELINE);
}

function drawBackdrop() {
  noStroke();
  for (let y = 0; y < height; y += 6) {
    const t = y / height;
    fill(240 - t * 30, 240 - t * 25, 240 - t * 20, 255);
    rect(0, y, WORLD_W, 6);
  }

  // distant markers
  stroke(0, 18);
  for (let x = 0; x < WORLD_W; x += 160) {
    line(x, 60, x, 120);
  }
}

function drawGround() {
  noStroke();
  fill(0, 18);
  rect(0, 360, WORLD_W, 140);

  stroke(0, 30);
  line(0, 360, WORLD_W, 360);
}

function drawAtmosphere() {
  noStroke();
  for (let i = 0; i < 26; i++) {
    const x = (camX + i * 120 + frameCount * 0.4) % WORLD_W;
    const y = 70 + ((i * 19) % 260);
    fill(0, 10);
    circle(x, y, 6);
  }
}

function drawSymbols(camCenterX) {
  for (const s of symbols) {
    const distToCenterX = abs(camCenterX - s.x);
    const glow = map(constrain(distToCenterX, 0, 260), 260, 0, 0, 180);

    noFill();
    stroke(0, s.found ? 30 : glow);
    circle(s.x, s.y, s.r * 2);

    if (!s.found) {
      const pulse = 6 + sin(frameCount * 0.08) * 2;
      circle(s.x, s.y, s.r + pulse);
    }
  }
}

function drawBlob(x, y) {
  noStroke();
  fill(20, 110, 255, 220);
  circle(x, y, 52);

  fill(255, 90);
  circle(x - 10, y - 12, 14);
}

function drawHUD(autoSpeed) {
  fill(0);
  noStroke();
  textAlign(LEFT, BASELINE);
  textSize(14);

  text("Week 5 — Meditative Camera Scroll", 10, 18);
  text("LEFT/RIGHT = drift | R = restart | +/- = speed", 10, 36);
  text(
    `autoSpeed: ${autoSpeed.toFixed(2)} | camX: ${camX.toFixed(0)} / ${WORLD_W}`,
    10,
    54,
  );

  if (toast) {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(0, 180);
    text(toast, width / 2, height * 0.18);
  }
}

function keyPressed() {
  if (state !== "play") return;

  if (key === "r" || key === "R") initWorld();
  if (key === "-" || key === "_") baseSpeed = max(0.2, baseSpeed - 0.2);
  if (key === "=" || key === "+") baseSpeed = min(4.0, baseSpeed + 0.2);
}
