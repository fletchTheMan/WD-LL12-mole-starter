// Player's Starting Score
let score = 0;

// DOM SELECT ELEMENTS
const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.getElementById("score");
const moleCountDisplay = document.getElementById("moleCount");
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", startGame);


// Player's starting score
function initializeGame() {
  holes.forEach(function (hole) {
    // Create the main mole body
    const mole = document.createElement("div");
    mole.className = "mole";
    // Create left eye
    const leftEye = document.createElement("div");
    leftEye.className = "mole-eye left-eye";
    mole.appendChild(leftEye);
    // Create right eye
    const rightEye = document.createElement("div");
    rightEye.className = "mole-eye right-eye";
    mole.appendChild(rightEye);
    // Create nose
    const nose = document.createElement("div");
    nose.className = "mole-nose";
    mole.appendChild(nose);
    // Add the mole to the hole
    hole.appendChild(mole);
    // Add event listener to each hole
    hole.addEventListener("click", whack);
  });
}
initializeGame();

// Create audio object for sound effects
const hitSound = new Audio('sounds/pop.mp3');
function whack(event) {
  if (!event.isTrusted) return; // Prevent fake clicks
  const hole = event.currentTarget;
  if (!hole.classList.contains('up')) return; // Only whack moles that
  // are currently up
  hole.classList.remove('up');
  score++;
  scoreDisplay.textContent = score;
  // Play sound effect
  hitSound.currentTime = 0; // Rewind to the start
  hitSound.play();
}

// Map keyboard keys to hole indexes (QWEASDZXC for holes 1-9)
const keyToHoleIndex = {
  q: 0,
  w: 1,
  e: 2,
  a: 3,
  s: 4,
  d: 5,
  z: 6,
  x: 7,
  c: 8,
};

// Listen for keydown events on the whole document
document.addEventListener("keydown", function (event) {
  // Get the pressed key in lowercase
  const key = event.key.toLowerCase();

  // Check if the key is mapped to a hole
  if (keyToHoleIndex.hasOwnProperty(key)) {
    // Get the corresponding hole element
    const holeIndex = keyToHoleIndex[key];
    const hole = holes[holeIndex];

    // Create a fake event object to reuse the whack function
    // Set isTrusted to true so it acts like a real user click
    const fakeEvent = {
      currentTarget: hole,
      isTrusted: true,
    };

    // Call the whack function for this hole
    whack(fakeEvent);
  }
});