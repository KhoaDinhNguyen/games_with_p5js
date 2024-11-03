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

const TIMER_EACH_GAME = 10;
let timer = TIMER_EACH_GAME;

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

let volume = 0;
const getVolumn = document.getElementById("volumn");

getVolumn.addEventListener("change", (event) => {
  volume = event.target.value / 100;
})
