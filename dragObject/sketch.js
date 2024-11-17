function setup() {
  createCanvas(windowWidth, 550);
}

/*
  Radius and position for two circles
*/ 
const r = 40;
const R = r * 1.25;

let r_x = 50;
let r_y = 50;
let R_x = 455;
let R_y = 335;

/*
  TIME_EACH_GAME: set the game time
  timer: timer for the game
*/ 
let TIME_EACH_GAME = 20;
let timer = TIME_EACH_GAME;

let shapeMove = false;
let gameStart = false;

/*
  gameScore: current game score
  bestScore: best game score
*/ 
let gameScore = 0;
let bestScore = 0;

/* -------------------------------- VARIABLE FOR DOM -------------------------------- */
const gameProgress = document.getElementById("gameProgress");
const time = document.getElementById("timer");
const score = document.getElementById("score");

const startButton = document.getElementById("start");

const finishGameNotification = document.getElementById("finishGame");

const currentScore = document.getElementById("currentscore");
const bestScoreRecord = document.getElementById("bestscore");

const getVolume = document.getElementById("volume");
let volume = getVolume.value / 100;

const setTimerDisplay = document.getElementById("setTimerDisplay");
const level1 = document.getElementById("level_1");
const level2 = document.getElementById("level_2");
const level3 = document.getElementById("level_3");
let levelChoose = level1;

const helpContent = document.getElementById("helpContent");
const helpQuit = document.getElementById("helpQuit");
const helpButton = document.getElementById("helpButton");

const quitPrompt = document.getElementById("quitPrompt");
const quitButton = document.getElementById("quitButton");
const noQuit = document.getElementById("no");

/* -------------------------------- FUNCTION -------------------------------- */
function distance ([x_1, y_1], [x_2, y_2]) {
  return Math.sqrt(Math.pow(x_1 - x_2, 2) + Math.pow(y_1 - y_2, 2));
}

function draw(){
  background('white');

  fill("white");
  drawingContext.setLineDash([15, 5]);
  circle(R_x, R_y, R * 2);
  
  fill("lightyellow");
  drawingContext.setLineDash([0, 0]);
  circle(r_x, r_y, r * 2);
  
  if (gameStart) {
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
      time.textContent = `Timer: ${timer}`;
    }
    else if (timer == 0) {
      const win = new Audio("../src/dragingObjectWin.mp3");
      win.volume = volume;
      win.play().then().catch(); 
      gameStart = false;
      finishGame();
    }
  }
}

//check if mouse in within circle
function mousePressed(){
  let d = dist(mouseX, mouseY, r_x, r_y);
  if(d < R){
    shapeMove = true;
  } else {
    shapeMove = false;
  }
}

//check if mouse is released on or off designated area
function mouseReleased(){
  const distanceBetweenTwoCircle = distance([mouseX, mouseY], [R_x, R_y]);

  shapeMove = false;

  if (distanceBetweenTwoCircle + r <= R && gameStart == true) {
    const correct = new Audio("../src/dragingObjectCorrect.mp3");
    correct.volume = volume;
    correct.play().then().catch();
    gameProgress.textContent = "Good job";

    gameScore++;
    if (gameScore > 0 && gameScore % 5 == 0) {
      const record = new Audio("../src/clickingObjectRecord.mp3");
      record.volume = volume;
      record.play().then().catch();
    }

    score.textContent = `Score: ${gameScore}`;

    R_x = random(100, windowWidth - 200);
    R_y = random(100, 500);
  }
  else if (gameStart == true) {
    const wrong = new Audio("../src/drawlingGameStrayLine.mp3");
    wrong.volume = volume;
    wrong.play().then().catch();

    gameProgress.textContent = "Wrong location";
  }
  else {
    gameProgress.textContent = "Game on";
  }
} 

//allows object to move with user input
function mouseDragged(){
  if (shapeMove && gameStart){
    r_y = mouseY;
    r_x = mouseX;
  }
}

function intialize() {
  timer = TIME_EACH_GAME;
  gameScore = 0;
  gameStart = true;
  display();
}

function display() {
  score.textContent = `Score: ${gameScore}`;
  time.textContent = `Timer: ${timer}`
}

/* ================================ INTERACTION ================================ */
/* -------------------------------- SET TIMER DISPLAY -------------------------------- */
setTimer(20, level1);

level1.addEventListener("click", () => {
  setTimer(20, level1);
});

level2.addEventListener("click", () => {
  setTimer(30, level2);
});

level3.addEventListener("click", () => {
  setTimer(45, level3);
});

function setTimer(timer, level) {
  const selectSound = new Audio("../src/selectSound.mp3");
  selectSound.volume = volume;
  selectSound.play().then().catch();
  levelChoose.style.backgroundColor = "yellowgreen";
  levelChoose = level;
  TIME_EACH_GAME = timer;
  levelChoose.style.backgroundColor = "darkgreen";
}

/* -------------------------------- HELP CONTENT -------------------------------- */
helpQuit.addEventListener("click", () => {
  helpContent.style.visibility = "hidden";
  const video = document.querySelector("video");
  video.pause();
  video.currentTime = 0;
});

helpButton.addEventListener("click", () => {
  helpContent.style.visibility = "visible";
})

/* -------------------------------- START BUTTON -------------------------------- */
startButton.addEventListener("click", () => {
  const video = document.querySelector("video");
  video.pause();
  video.currentTime = 0;

  helpContent.style.visibility = "hidden";
  startButton.style.visibility = "hidden";

  const selectSound = new Audio("../src/selectSound.mp3");
  selectSound.volume = volume;
  selectSound.play().then().catch();

  finishGameNotification.style.visibility = "hidden";
  
  gameProgress.style.display = 'block';
  setTimerDisplay.style.display = 'none';
  intialize();
});

/* -------------------------------- FINISH GAME NOTIFICATION -------------------------------- */
function finishGame() {
  if (bestScore < gameScore) {
    bestScore = gameScore;
  }

  finishGameNotification.style.visibility = "visible";

  startButton.style.visibility = "visible";
  startButton.textContent = "Try Again";
  
  currentScore.textContent = `Current Score: ${gameScore}`;
  bestScoreRecord.textContent = `Best Score: ${bestScore}`;

  setTimerDisplay.style.display = 'block';
  gameProgress.style.display = 'none';
}

/* -------------------------------- QUIT BUTTON  -------------------------------- */
noQuit.addEventListener("click", () => {
  quitPrompt.style.visibility = "hidden";
})

quitButton.addEventListener("click", () => {
  quitPrompt.style.visibility = "visible";
})

/* -------------------------------- VOLUME BUTTON -------------------------------- */
getVolume.addEventListener("change", (event) => {
  volume = event.target.value / 100;
});
