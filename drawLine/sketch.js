function distanceBetweenTwoPoints([x1, y1] , [x2, y2]) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

class Line {
  constructor([[x1, y1], [x2, y2]]){
    [[this.x1 , this.y1], [this.x2, this.y2]] = [[x1, y1], [x2, y2]];
    this.a = 0;
    if (y1 == y2) {
      this.a = 0;
      this.b = 1;
      this.c = -this.y1;
    }
    else if(x1 == x2) {
      this.a = 1;
      this.b = 0;
      this.c = -this.x1;
    }
    else {
      this.a = 1;
      this.b = (-this.a * (this.x1 - this.x2)) / (this.y1 - this.y2);
      this.c = -(this.a * this.x1 + this.b * this.y1);
    }
   
    this.points = [];
    this.checkPoints = [];
    this.finish = false;
    const gap_x = Math.abs((this.x1 - this.x2) / 100);
    const gap_y = Math.abs((this.y1 - this.y2) / 100);
    
    if (gap_x !== 0) {
      let i = this.x2 > this.x1 ? this.x1 : this.x2;
      while ((this.x1 <= i && i <= this.x2) || (this.x2 <= i && i <= this.x1)) {
        this.points.push([i, - (this.a * i + this.c) / this.b]);
        this.checkPoints.push(false);
        i = i + gap_x;
      }
    }
    else {
      let i = this.y2 > this.y1 ? this.y1: this.y2;
      while ((this.y1 <= i && i <= this.y2) || (this.y2 <= i && i <= this.y1)) {
        this.points.push([this.x1, i]);
        this.checkPoints.push(false);
        i = i + gap_y;
      }
    }
  }
  drawLine(){
    if (this.finish == false) {
      stroke('grey');
      strokeWeight(3);
      drawingContext.setLineDash([5, 15]);
      line(this.x1, this.y1, this.x2, this.y2);
    }
    else {
      stroke('green');
      strokeWeight(3);
      drawingContext.setLineDash([0, 0]);
      line(this.x1, this.y1, this.x2, this.y2);
    }

    drawingContext.setLineDash([0, 0]);
    stroke('red');
    fill('red');
    circle(this.x1, this.y1, 20);
    
    stroke('red');
    fill('red');
    circle(this.x2, this.y2, 20);
  }
  isFollowed([x ,y]) {
    const distanceBetweenCheckPoint = distanceBetweenTwoPoints([this.x1, this.y1], [x, y]);
    if (distanceBetweenCheckPoint <= 20) {
      return true;
    }
    /*
    --- Formula from point to distance ---
    
    - First the formula of the line is needed
    Every line has equation: ax + by + c = 0
    Given two different points, a and b are always found.
    
    - Formula of the distance between point and line
    d(M, d) = |a * Mx + b * My + c| / sqrt(a^2 + b^2)
    */
    const distance = Math.abs(this.a * x + this.b * y + this.c) / Math.sqrt(this.a * this.a + this.b * this.b);
    // If the distance is greater than 5, then the user strays the line
    if (distance > 5) {
      return false;
    }
    else {
      for(let i = 0; i < 100; ++i) {
        if (Math.sqrt(Math.pow(x - this.points[i][0], 2) + Math.pow(y - this.points[i][1], 2) <= 5)) {
              this.checkPoints[i] = true;
            }
      }
      return true;
    }
  }
  /*
  isFinish function
  */
  isFinish([x ,y]) {
    /*
    isFinish checks if the mouse is inside the the circle
    */
    let count = 0;
    
    for (let i = 0; i < 100; ++i) {
      if (this.checkPoints[i] == true){
        count++;
      }
    }
    const distance = distanceBetweenTwoPoints([this.x2, this.y2], [x, y]);
    if (distance <= 20 && count >= 75) {
      /*
      if the mouse is in the circle and their points are still in line
      -> then user suceed
      */
      this.finish = true;
      return true;
    }
    return false;
  }
}

class Model {
  constructor(arrayOfLine) {
    this.arrayOfLine = arrayOfLine;
    this.currentLineIndex = 0;
    this.correctPoints = [];
    this.falsePoints = [];
    this.finish = false;
    this.length = arrayOfLine.length;
    this.correctPoints = [];
    this.falsePoints = [];
  }
  drawModel() {
    for (const line of this.arrayOfLine) {
      line.drawLine();
    }
  }
  isFollowed([x, y]) {
    const currentLine = this.arrayOfLine[this.currentLineIndex];
    const finish = currentLine.isFinish([x ,y]);
    if (finish == true && this.currentLineIndex < this.length - 1) {
      this.currentLineIndex++;
      this.correctPoints.length = 0;
      this.falsePoints.length = 0;
    }
    
    else if(finish == true && this.currentLineIndex == this.length - 1) {
      console.log("Finish");
    }
    
    return currentLine.isFollowed([x, y]);

  }
  isFinish([x ,y]) {
    if (this.currentLineIndex < this.length) {
      return false;
    }
    return this.arrayOfLine[this.length - 1].isFinish([x, y]);
  }
  run() {
    if(this.isFinish([mouseX, mouseY]) !== true) {
      if(this.isFollowed([mouseX, mouseY])) {
        this.correctPoints.push([mouseX, mouseY]);
      }
      else {
        this.falsePoints.push([mouseX, mouseY]);
        insertError();
      }
    }
  }
}

// ================================= DATABASE
//const line1 = new Line([[200, 200], [400, 400]]);
class GameStart {
  constructor() {
    this.start = false;
    this.currentModelIndex = 0;
    const arrayOfModel = [
      new Model([
        new Line([[200, 200], [400, 200]])
      ]),
      new Model([
        new Line([[200, 200], [600, 200]])
      ]),
      new Model([
        new Line([[200, 200], [300, 300]]),
        new Line([[300, 300], [400, 200]]),
        new Line([[400, 200], [500, 300]]),
        new Line([[500, 300], [600, 200]]),
        new Line([[600, 200], [700, 300]]),
        new Line([[700, 300], [800, 200]]),
      ]),
      new Model([

      ]),
      new Model([

      ]),
    ]
  }
}
const model1 = new Model([
  new Line([[200, 200], [200, 400]]),
  new Line([[200, 400], [400, 400]]),
  new Line([[400, 400], [400, 200]]),
  new Line([[400, 200], [600, 200]]),
  new Line([[600, 200], [600, 400]]),
  new Line([[600, 400], [800, 400]]),
  new Line([[800, 400], [800, 200]]),


]);

const game = new GameStart();

// ================================= SETUP
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  model1.drawModel();
  
  stroke('black');
  for (const item of model1.correctPoints) {
    point(item[0], item[1]);
  }
  stroke('red');
  for (const item of model1.falsePoints) {
    point(item[0], item[1]);
  }
}

function mouseDragged() {
  if (game.start === true) {
    model1.run();
  }
}

const startButton = document.getElementById("startButton");
const text = document.getElementById("text");

const tryAgainButton = document.getElementById("tryAgainButton");

tryAgainButton.addEventListener("click", () => {  
  model1.correctPoints.length = 0;
  model1.falsePoints.length = 0;
  draw();
  const errorText = document.getElementsByClassName("error");
  for (const item of errorText) {
    item.style.visibility = "hidden";
  }
  text.textContent = "Game on";
  
})

function insertError() {
  const errorText = document.getElementsByClassName("error");
  text.textContent = "Oh no, the line is out";
  for (const item of errorText) {
    item.style.visibility = "visible";
  }
}


startButton.addEventListener("click", () => {
  game.start = true;
  startButton.style.visibility = "hidden";
  text.style.visibility = "visible";
})