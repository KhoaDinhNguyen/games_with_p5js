function setup() {
  createCanvas(windowWidth, 500);
}


const r = 40;
const R = r * 1.25;

const TIME_EACH_GAME = 5;
let timer = TIME_EACH_GAME;

let shapeY = 50;
let shapeX = 50;
let x2 = 455;
let y2 = 335;

let shapeMove = false;
let gameStart = false;
let gameScore = 0;

function distance ([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
function draw(){
  background('lightblue');

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
    result.textContent = "Good";
    gameScore++
    score.textContent = `Score: ${gameScore}`;
    x2 = random(100, windowWidth - 200);
    y2 = random(100, 400);
  }
  else if (gameStart == true) {
    result.textContent = "Bad";
  }
  else {
    result.textContent = "Result"
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
const currentScore = document.getElementById("currentscore");
const finish = document.getElementById("finish");

function intialize() {
  timer = TIME_EACH_GAME;
  gameScore = 0;
  gameStart = true;
}
startButton.addEventListener("click", () => {
  startButton.style.visibility = "hidden";
  finish.style.visibility = "hidden";
  intialize();
});

function finishGame() {
  finish.style.visibility = "visible";
  startButton.style.visibility = "visible";
  startButton.innerHTML = "<p>Try Again</p>";
  currentScore.textContent = `Score: ${gameScore}`;
}