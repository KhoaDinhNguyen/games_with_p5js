function setup() {
  createCanvas(windowWidth, 600);
}
let randomNum = Math.random();
let circleX = 350;
let circleY = 220;
let radius = 100 / 2;

let gameStart = false;

let gameScore = 0;

const TIMER_EACH_GAME = 3;
let timer = TIMER_EACH_GAME;

function distanceTwoPoints([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function draw() {
  background('lightblue');
  
  circle(circleX, circleY, radius * 2);
  textSize(35);
  textStyle(BOLD);
  text("Score: "+ gameScore, 15, 35);
  textSize(35);
  text("Timer: " + timer, 500, 35);
  
  if (gameStart) {
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer == 0) {
      textStyle(BOLD);
      gameStart = false;
      finishGame();
      startButton.style.visibility = "visible";
    }
  }
}

function mouseClicked(){
  if(distanceTwoPoints([circleX, circleY], [mouseX, mouseY]) < radius && gameStart === true) {
   circleX = random(0, 500);
   circleY = random(0, 500); 
   gameScore++;
  }
}

function finishGame() {
  const finish = document.getElementById("finish");
  finish.style.visibility = "visible";
  const score = document.getElementById("score");
  score.textContent = `Score: ${gameScore}`;
}

const startButton = document.getElementById("start");

startButton.addEventListener("click", () => {
  startButton.style.visibility = "hidden";
  gameStart = true;
  startButton.innerHTML= "<p>Try Again</p>";
  initialize();
})

function initialize() {
  timer = TIMER_EACH_GAME;
  gameScore = 0;
}