function setup() {
  createCanvas(windowWidth, 500);
}

let shapeY = 50;
let shapeX = 50;
const r = 40;
const R = r * 1.25;
const d1 = r * 2;
const d2 = R * 2;

const TIME_EACH_GAME = 5;
let timer = TIME_EACH_GAME;

let x2 = 455;
let y2 = 335;
let shapeMove = false;
let completeLevel = false;
let gameStart = true;
var gameScore = 0;

function distance ([x1, y1], [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}
function draw(){
  background('lightblue');
  
  fill("white");
  drawingContext.setLineDash([15, 5]);
  circle(x2, y2, d2);
  
  fill("lightyellow");
  drawingContext.setLineDash([0, 0]);
  let circle1 = circle(shapeX, shapeY, d1);
  
  if (frameCount % 60 == 0 && timer > 0) {
    timer--;
    time.textContent = `Timer: ${timer}`
  }
  if (timer == 0) {
    gameStart = false;
    textSize(35);
    textStyle(BOLD);
    text("GAME OVER", 250, 275);
    text("SCORE: " + gameScore, 250, 310);
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
    completeLevel = true;
    x2 = random(100, windowWidth - 200);
    y2 = random(100, 400);
  }
  else if (gameStart == true) {
    result.textContent = "Bad";
    completeLevel = false;
  }
  else {
    result.textContent = "Result"
  }
} 

//allows object to move with user input
function mouseDragged(){
  if (shapeMove){
    shapeY = mouseY;
    shapeX = mouseX;
  }
}


const result = document.getElementById("result");
const time = document.getElementById("timer");
const score = document.getElementById("score");