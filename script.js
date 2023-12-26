"use strict";
// Game precondition
const score0Element = document.querySelector("#score--0");
const score1Element = document.getElementById("score--1");
const diceElement = document.querySelector(".dice");

// buttons
const diceButton = document.querySelector(".btn--roll");
const newGameButton = document.querySelector(".btn--new");
const holdButton = document.querySelector(".btn--hold");

// precondition
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

// current scores
const current1 = document.querySelector("#current--1");
const current0 = document.querySelector("#current--0");
let finalScores = [0, 0];
let currentScore = 0;
let currentPlayer = 0;

const switchPlayer = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove("player--active");
  document.querySelector(`#current--${currentPlayer}`).textContent = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0; // turnary operatos
  currentScore = 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add("player--active");
};

// Rolling dice
diceButton.addEventListener("click", function () {
  // generate new dice
  let secretNumber = Math.trunc(Math.random() * 7);
  // display dice
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${secretNumber}.png`;

  // if dice  = 1, switch to another player
  if (secretNumber === 0) {
    switchPlayer();
  } else {
    currentScore = currentScore + secretNumber;
    document.querySelector(`#current--${currentPlayer}`).textContent =
      currentScore;
  }
});

holdButton.addEventListener("click", function () {
  // add value to array
  finalScores[currentPlayer] = finalScores[currentPlayer] + currentScore;

  document.querySelector(`#score--${currentPlayer}`).textContent =
    finalScores[currentPlayer];
  if (finalScores[currentPlayer] >= 20) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove("player--active");
    holdButton.disabled = true;
    diceButton.disabled = true;
    diceElement.classList.add("hidden");
  } else {
    switchPlayer();
  }
});

newGameButton.addEventListener("click", function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove("player--active");
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active");
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  finalScores = [0, 0];
  current0.textContent = 0;
  current1.textContent = 0;
  currentScore = 0;
  currentPlayer = 0;
  holdButton.disabled = false;
  diceButton.disabled = false;
});
