function setup() {
  createCanvas(windowWidth, 500);
}


const r = 40;
const R = r * 1.25;

const TIME_EACH_GAME = 21;
let timer = TIME_EACH_GAME;

let shapeY = 50;
let shapeX = 50;
let x2 = 455;
let y2 = 335;

let shapeMove = false;
let gameStart = false;
let gameScore = 0;
let bestScore = 0;

function distance ([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
function draw(){
  background('white');

  fill("white");
  drawingContext.setLineDash([15, 5]);
  circle(x2, y2, R * 2);
  
  fill("lightyellow");
  drawingContext.setLineDash([0, 0]);
  circle(shapeX, shapeY, r * 2);
  
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
  let d = dist(mouseX, mouseY, shapeX, shapeY);
  if(d < R){
    shapeMove = true;
  } else {
    shapeMove = false;
  }
}

//check if mouse is released on or off designated area
function mouseReleased(){
  shapeMove = false;
  const distanceBetweenTwoCircle = distance([mouseX, mouseY], [x2, y2]);
  if (distanceBetweenTwoCircle + r <= R && gameStart == true) {
    const correct = new Audio("../src/dragingObjectCorrect.mp3");
    correct.volume = volume;
    correct.play().then().catch();
    result.textContent = "Good job";
    gameScore++;
    if (gameScore > 0 && gameScore % 5 == 0) {
      const record = new Audio("../src/clickingObjectRecord.mp3");
      record.volume = volume;
      record.play().then().catch();
    }
    score.textContent = `Score: ${gameScore}`;
    x2 = random(100, windowWidth - 200);
    y2 = random(100, 400);
  }
  else if (gameStart == true) {
    const wrong = new Audio("../src/drawlingGameStrayLine.mp3");
    wrong.volume = volume;
    wrong.play().then().catch();
    result.textContent = "Wrong location";
  }
  else {
    result.textContent = "Run game";
  }
} 

//allows object to move with user input
function mouseDragged(){
  if (shapeMove && gameStart){
    shapeY = mouseY;
    shapeX = mouseX;
  }
}


const result = document.getElementById("result");
const time = document.getElementById("timer");
const score = document.getElementById("score");
const startButton = document.getElementById("start");

function intialize() {
  timer = TIME_EACH_GAME;
  gameScore = 0;
  gameStart = true;
  score.textContent = `Score: ${gameScore}`;
}
startButton.addEventListener("click", () => {
  const finish = document.getElementById("finish");

  const select = new Audio("../src/selectSound.mp3");
  select.volume = volume;
  select.play().then().catch();

  helpContent.style.visibility = "hidden";
  const video = document.querySelector("video");
  video.pause();
  video.currentTime = 0;
  startButton.style.visibility = "hidden";
  finish.style.visibility = "hidden";
  intialize();
});

function finishGame() {
  const currentScore = document.getElementById("currentscore");
  const finish = document.getElementById("finish");
  const bestScoreText = document.getElementById("bestscore");

  if (bestScore < gameScore) {
    bestScore = gameScore;
  }

  finish.style.visibility = "visible";
  startButton.style.visibility = "visible";
  startButton.innerHTML = "<p>Try Again</p>";
  currentScore.textContent = `Current Score: ${gameScore}`;
  bestScoreText.textContent = `Best Score: ${bestScore}`;
}

const quitPrompt = document.getElementById("quitPrompt");
const quit = document.getElementById("quit");
const noQuit = document.getElementById("no");

noQuit.addEventListener("click", () => {
  quitPrompt.style.visibility = "hidden";
})

quit.addEventListener("click", () => {
  quitPrompt.style.visibility = "visible";
})

const getVolume = document.getElementById("volumn");
let volume = getVolume.value / 100;

getVolume.addEventListener("change", (event) => {
  volume = event.target.value / 100;
});

const helpContent = document.getElementById("helpContent");
const helpQuit = document.getElementById("helpQuit");
const help = document.getElementById("help");

helpQuit.addEventListener("click", () => {
  helpContent.style.visibility = "hidden";
  const video = document.querySelector("video");
  video.pause();
  video.currentTime = 0;
});

help.addEventListener("click", () => {
  helpContent.style.visibility = "visible";
})