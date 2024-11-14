function setup() {
  createCanvas(0, 0);
}

function draw() {
  background(220);
}

/* ================================= VARIABLES ================================= */
const selectSound = new Audio('./src/selectSound.mp3'); // sound when select
const backgroundMusic = new Audio('./src/gameLoop1.mp3'); // backgound music
const body = document.getElementsByTagName("body")[0];

// Sound whenever body elements are clicked
body.addEventListener("click", () => {
  backgroundMusic.play().then(() => {
    backgroundMusic.muted = false;
  }).catch(error => {
    console.log(error);
  })
})

const helpContent = document.getElementById("helpContent");

// Interaction when use click on help button
const helpButton = document.getElementById("helpButton");
helpButton.addEventListener("click", () => {
  helpContent.style.visibility = "visible";
});

// Interaction when use click on close button in help
const helpQuit = document.getElementById("helpQuit");
helpQuit.addEventListener("click", () => {
  helpContent.style.visibility = "hidden";
})


const games = document.getElementsByClassName("game");

for (const game of games) {
  // Sound when user click on each game
  game.addEventListener("click", () => {
    selectSound.play().then().catch();
  })
}

// Volumn settings
const volumeSetting = document.getElementById("volume");

volumeSetting.addEventListener("change", (event) => {
  const volumeValue = event.target.value;
  selectSound.volumeValue = volumeValue / 100;
  backgroundMusic.volumeValue = volumeValue / 100;
})