function setup() {
  createCanvas(windowWidth, 550);
}

let circleX = 350;
let circleY = 220;
const RADIUS = 100 / 2;

let gameStart = false;

/*
  TIME_EACH_GAME: set the game time
  timer: timer for the game
  numberOfClick: number of user'clicks
*/ 
let TIME_EACH_GAME = 20;
let timer = TIME_EACH_GAME;
let numberOfClick = 0;

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
function distanceTwoPoints([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function draw() {
  background('white');
  
  fill("#e74c3c");
  circle(circleX, circleY, RADIUS * 2);
  
  if (gameStart) {
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
      time.textContent = `Timer: ${timer}`;
    }
    if (timer == 0) {
      const winGame = new Audio("../src/clickingObjectWin.mp3");
      winGame.volume = volume;
      winGame.play().then().catch();
      gameStart = false;
      finishGame();
    }
  }
}

function mouseClicked(){
  if(distanceTwoPoints([circleX, circleY], [mouseX, mouseY]) < RADIUS && gameStart === true) {
    const correct = new Audio("../src/clickingObjectClick.mp3");
    correct.volume = volume;
    correct.play().then().catch();
    gameProgress.textContent = "Nice";

    circleX = random(100, windowWidth - 200);
    circleY = random(100, 500); 
    gameScore++;

    if (gameScore > 0 && gameScore % 10 === 0){
      const record = new Audio("../src/clickingObjectRecord.mp3");
      record.volume = volume;
      record.play().then().catch();
    }
   score.textContent = `Score: ${gameScore}`;
   numberOfClick++;

  }
  else if(gameStart === true && numberOfClick > 0) {
    gameProgress.textContent = "Misclicked";
  }
}

function initialize() {
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

  initialize();
})

/* -------------------------------- FINISH GAME NOTIFICATION -------------------------------- */
function finishGame() {
  if (bestScore < gameScore) {
    bestScore = gameScore;
  }
  
  numberOfClick = 0;
  
  finishGameNotification.style.visibility = "visible";

  startButton.style.visibility = "visible";
  startButton.textContent = "Try Again";

  currentScore.textContent = `Current score: ${gameScore}`;
  bestScoreRecord.textContent = `Best score: ${bestScore}`;
  
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
