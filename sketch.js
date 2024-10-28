function setup() {
  createCanvas(0, 0);
}

function draw() {
  background(220);
}

const select = new Audio('./src/selectSound.mp3');
const backgroundMusic = new Audio('./src/gameLoop1.mp3');

const body = document.getElementsByTagName("body")[0];

body.addEventListener("click", () => {
  backgroundMusic.play().then(() => {
    backgroundMusic.muted = false;
  }).catch(error => {
    console.log(error);
  })
})

const questionButton = document.getElementById("question");
const help = document.getElementById("help");
const helpClose = document.getElementById("helpClose");

questionButton.addEventListener("click", (event) => {
  help.style.visibility = "visible";
});

helpClose.addEventListener("click", (event) => {
  help.style.visibility = "hidden";
})

const games = document.getElementsByClassName("game");

for (const game of games) {
  game.addEventListener("click", () => {
    select.play().then().catch();
  })
}

const getVolume = document.getElementById("volume");

getVolume.addEventListener("change", (event) => {
  const volume = event.target.value;
  select.volume = volume / 100;
  backgroundMusic.volume = volume / 100;
})