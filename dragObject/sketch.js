function setup() {
  createCanvas(windowWidth, windowHeight);
  let circle1 = circle(50, 50, r1);
  fill("lightyellow");
  drawingContext.setLineDash([5, 15]);
}

let shapeY = 50;
let shapeX = 50;
const r1 = 40;
const r2 = r1 * 1.125;
const d1 = r1 * 2;
const d2 = r2 * 2;
let x2 = 455;
let y2 = 335;
let shapeMove = false;
let completeLevel = false;
var timer = 20;
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

    textSize(35);
  textStyle(BOLD);
  text("Score: "+ gameScore, 15, 35);
  textSize(35);
  text("Timer: " + timer, 500, 35);
  
  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }
  if (timer == 0) {
    gameStart = false;
    textStyle(BOLD);
    text("GAME OVER", 250, 275);
    text("SCORE: " + gameScore, 250, 310);
  }
  
}

//check if mouse in within circle
function mousePressed(){
  let d = dist(mouseX, mouseY, shapeX, shapeY);
  if(d < r2){
    shapeMove = true;
  } else {
    shapeMove = false;
  }
}

//check if mouse is released on or off designated area
function mouseReleased(){
  shapeMove = false;
  const distanceBetweenTwoCircle = distance([mouseX, mouseY], [x2, y2]);
  console.log(distanceBetweenTwoCircle);
  console.log(r2 / 2);
  if (distanceBetweenTwoCircle < r2 / 2 && gameStart == true) {
    console.log("Good");
    gameScore++
    completeLevel = true;
  x2 = random(0,500);
  y2 = random(0, 500);
  }
  else {
    console.log("Bad");
    completeLevel = false;
  }
} 

//allows object to move with user input
function mouseDragged(){
  if (shapeMove){
    shapeY = mouseY;
    shapeX = mouseX;
  }
}


