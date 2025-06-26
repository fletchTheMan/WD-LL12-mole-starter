let moleCount = 0;
let gameRunning = false;
let lastHole = null;

const GAME_DURATION = 15000;
const MIN_PEEP_TIME = 1000;
const MAX_PEEP_TIME = 1500;

// Make a mole appear
function showMole() {
  if (!gameRunning) return;

  const peepDuration = getRandomTime(MIN_PEEP_TIME, MAX_PEEP_TIME);
  const hole = getRandomHole(holes);

  // Add the proper class 
  hole.classList.add('up');
  moleCount++;
  moleCountDisplay.textContent = moleCount;

  setTimeout(() => {
    hole.classList.remove('up');
    if (gameRunning) showMole();
  }, peepDuration);
}

// Start the game
function startGame() {
  score = 0;
  moleCount = 0;
  gameRunning = true;

  scoreDisplay.textContent = score;
  moleCountDisplay.textContent = moleCount;
  startButton.disabled = true;

  showMole();

  setTimeout(() => {
    gameRunning = false;
    startButton.disabled = false;
    // Show ending screen
    showEndingScreen();
  }, GAME_DURATION);
}

// Generate random time between min and max
function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Select a random hole that's different from the last one
function getRandomHole(holes) {
  const randomIndex = Math.floor(Math.random() * holes.length);
  const selectedHole = holes[randomIndex];

  if (selectedHole === lastHole) {
    return getRandomHole(holes);
  }

  lastHole = selectedHole;
  return selectedHole;
}

// Show ending screen with final score
function showEndingScreen() {
  // Create a simple overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';

  // Show the final score
  const message = document.createElement('div');
  message.style.color = 'white';
  message.style.fontSize = '2rem';
  message.style.marginBottom = '20px';
  message.textContent = `Game Over! Your score: ${score}`;
  overlay.appendChild(message);

  // Add a button to close the overlay
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.fontSize = '1.2rem';
  closeButton.onclick = function() {
    document.body.removeChild(overlay);
  };
  overlay.appendChild(closeButton);

  document.body.appendChild(overlay);
}
