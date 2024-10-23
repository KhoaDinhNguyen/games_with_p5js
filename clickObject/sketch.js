function setup() {
  createCanvas(windowWidth, windowHeight);
}
let randomNum = Math.random();
let circleX = 350;
let circleY = 220;
let radius = 100 / 2;
  var timer = 20;

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
  
  
  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }
  if (timer == 0) {
    textStyle(BOLD);
    text("GAME OVER", 250, 275);
    text("SCORE: " + gameScore, 250, 310);
  }

}

var gameScore = 0;

function mouseClicked(){
  if(distanceTwoPoints([circleX, circleY], [mouseX, mouseY]) < radius) {
   circleX = random(0, 500);
   circleY = random(0, 500); 
   gameScore ++;
  }
}