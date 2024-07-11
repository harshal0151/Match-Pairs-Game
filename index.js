let cards = document.querySelectorAll(".card");
let cardArray = [...cards];
let flippedCard = false;
let lockCard = false;
let firstCard, secondCard;
let attempts = 0;

// Shuffle the cards
function shuffle() {
  cardArray.forEach((card) => {
    let randomIndex = Math.floor(Math.random() * cardArray.length);
    card.style.order = randomIndex;
    card.children[1].style.backgroundImage = `url(${card.getAttribute("data-image")})`;
  });
}

// Update attempts
function updateAttempts() {
  attempts++;
  document.getElementById("attempts").innerText = `Attempts: ${attempts}`;
}

// Flip a card
function flipCard() {
  if (lockCard) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  updateAttempts();

  if (!flippedCard) {
    // first card flipped
    flippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Check for a match
function checkForMatch() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  if (isMatch) {
    firstCard.classList.add("match");
    secondCard.classList.add("match");
    disableCards();
  } else {
    firstCard.classList.add("no-match");
    secondCard.classList.add("no-match");
    unflipCards();
  }
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
  checkWin();
}

// Unflip non-matched cards
function unflipCards() {
  lockCard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip", "no-match");
    secondCard.classList.remove("flip", "no-match");
    resetBoard();
  }, 1500);
}

// Reset the game board
function resetBoard() {
  [flippedCard, lockCard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Reset the game
function resetGame() {
  // Remove flip, match, and no-match classes from all cards
  cardArray.forEach(card => card.classList.remove("flip", "match", "no-match"));

  // Re-enable click event listener for all cards
  cardArray.forEach(card => card.addEventListener("click", flipCard));

  // Reset the board variables
  resetBoard();

  // Reset attempts counter
  attempts = 0;
  document.getElementById("attempts").innerText = `Attempts: ${attempts}`;

  // Hide the win message
  document.getElementById("winMessage").style.display = "none";

  // Add a slight delay before shuffling to ensure the flip animation completes
  setTimeout(() => {
    // Shuffle the cards again
    shuffle();
  }, 500); // 500ms delay
}

// Check if all cards are matched
function checkWin() {
  if (document.querySelectorAll('.flip').length === cardArray.length) {
    document.getElementById("attemptCount").innerText = attempts;
    document.getElementById("winMessage").style.display = "block";
  }
}

// Start the game
function startGame() {
  shuffle();
  cards.forEach((card) => card.addEventListener("click", flipCard));
}

// Add event listener to the reset button
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initialize the game
startGame();
