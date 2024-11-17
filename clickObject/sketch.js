function setup() {
  createCanvas(windowWidth, 600);
}
let randomNum = Math.random();
let circleX = 350;
let circleY = 220;
const RADIUS = 100 / 2;

let gameStart = false;

let gameScore = 0;
let bestScore = 0;

let TIMER_EACH_GAME = 20;
let timer = TIMER_EACH_GAME;

let numberOfClick = 0;

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
    const clickCirle = new Audio("../src/clickingObjectClick.mp3");
    clickCirle.volume = volume;
    clickCirle.play().then().catch();
    circleX = random(100, windowWidth - 200);
    circleY = random(100, 500); 
    gameScore++;
    if (gameScore > 0 && gameScore % 10 === 0){
      const newRecord = new Audio("../src/clickingObjectRecord.mp3");
      newRecord.volume = volume;
      newRecord.play().then().catch();
    }
   score.textContent = `Score: ${gameScore}`;
   gameProgess.textContent = "Nice";
   numberOfClick++;
  }
  else if(gameStart === true && numberOfClick > 0) {
    gameProgess.textContent = "Misclicked";
  }
}

const score = document.getElementById("score");
const time = document.getElementById("timer");

function display() {
  score.textContent = `Score: ${gameScore}`;
  time.textContent = `Timer: ${timer}`
}

function finishGame() {
  const finish = document.getElementById("finish");
  finish.style.visibility = "visible";

  const currentScore = document.getElementById("currentscore");
  currentScore.textContent = `Current score: ${gameScore}`;

  const bestscore = document.getElementById("bestscore");
  
  if (bestScore < gameScore) {
    bestScore = gameScore;
  }
  bestscore.textContent = `Best score: ${bestScore}`;
  startButton.style.visibility = "visible";
  timerDisplay.style.visibility = "visible";
  gameProgess.textContent = "Game on";
  record.replaceChild(timerDisplayChoose, gameProgess);
}

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
  const select = new Audio("../src/selectSound.mp3");
  select.volume = volume;
  select.play().then().catch();
  startButton.style.visibility = "hidden";
  gameStart = true;
  startButton.innerHTML= "<p>TRY AGAIN</p>";
  initialize();

  const finish = document.getElementById("finish");
  finish.style.visibility = "hidden";
  helpContent.style.visibility = "hidden";
  const video = document.querySelector("video");
  video.pause();
  video.currentTime = 0;
  timerDisplay.style.visibility = "hidden";
  record.replaceChild(gameProgess, timerDisplayChoose);
})

function initialize() {
  timer = TIMER_EACH_GAME;
  gameScore = 0;
  display();
}

const quit = document.getElementById("quit");
const noQuit = document.getElementById("no");
const quitPrompt = document.getElementById("quitPrompt");

quit.addEventListener("click" ,() => {
  quitPrompt.style.visibility = "visible";
})

noQuit.addEventListener("click", () => {
  quitPrompt.style.visibility = "hidden";
})

let volume = document.getElementById("volumn").value / 100;
const getVolumn = document.getElementById("volumn");

getVolumn.addEventListener("change", (event) => {
  volume = event.target.value / 100;
})

const help = document.getElementById("help");
const helpContent = document.getElementById("helpContent");
const helpQuit = document.getElementById("helpQuit");

helpQuit.addEventListener("click", () => {
  helpContent.style.visibility = "hidden";
  const video = document.querySelector("video");
  video.pause();
  video.currentTime = 0;
})

help.addEventListener("click", () => {
  helpContent.style.visibility = "visible";
})

const timerDisplay = document.getElementById("timerDisplay");
const level1 = document.getElementById("level_1");
const level2 = document.getElementById("level_2");
const level3 = document.getElementById("level_3");
let levelChoose = level1;
// Stop = pause + reset the playhead

setTimer(20, level1);

level1.addEventListener("click", () => {
  const select = new Audio("../src/selectSound.mp3");
  select.volume = volume;
  select.play().then().catch();
  setTimer(20, level1);
});

level2.addEventListener("click", () => {
  const select = new Audio("../src/selectSound.mp3");
  select.volume = volume;
  select.play().then().catch();
  setTimer(30, level2);
});

level3.addEventListener("click", () => {
  const select = new Audio("../src/selectSound.mp3");
  select.volume = volume;
  select.play().then().catch();
  setTimer(45, level3);
});

function setTimer(timer, level) {
  levelChoose.style.backgroundColor = "yellowgreen";
  levelChoose = level;
  TIMER_EACH_GAME = timer;
  levelChoose.style.backgroundColor = "darkgreen";
}


const record = document.getElementById("record");
const timerDisplayChoose = document.getElementById("timerDisplay");
const gameProgess = document.createElement("p");
gameProgess.textContent = "Game on";
gameProgess.setAttribute("id", "gameProgess");


