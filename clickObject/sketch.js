function setup() {
  createCanvas(windowWidth, 600);
}
let randomNum = Math.random();
let circleX = 350;
let circleY = 220;
const RADIUS = 100 / 2;

let gameStart = false;

let gameScore = 0;

const TIMER_EACH_GAME = 5;
let timer = TIMER_EACH_GAME;

function distanceTwoPoints([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function draw() {
  background('white');
  
  fill("red");
  circle(circleX, circleY, RADIUS * 2);
  textStyle(BOLD);
  
  if (gameStart) {
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
      time.textContent = `Timer: ${timer}`;
    }
    if (timer == 0) {
      gameStart = false;
      finishGame();
    }
  }
}

function mouseClicked(){
  if(distanceTwoPoints([circleX, circleY], [mouseX, mouseY]) < RADIUS && gameStart === true) {
   circleX = random(100, 500);
   circleY = random(100, 500); 
   gameScore++;
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
  const bestscore = document.getElementById("bestscore");
  bestscore.textContent = `Score: ${gameScore}`;
  startButton.style.visibility = "visible";
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